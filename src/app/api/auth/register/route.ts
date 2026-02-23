import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import getDb from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters' }, { status: 400 });
    }

    const db = getDb();

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').get(email, username);
    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already taken' }, { status: 409 });
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 12);

    db.prepare('INSERT INTO users (id, email, username, password_hash, coins) VALUES (?, ?, ?, ?, ?)').run(id, email, username, passwordHash, 10);

    // Give welcome bonus transaction
    db.prepare('INSERT INTO transactions (id, user_id, type, amount, description) VALUES (?, ?, ?, ?, ?)').run(uuidv4(), id, 'ad_reward', 10, 'Welcome bonus - 10 free Genie Coins!');

    const token = signToken({ userId: id, email, username });

    const response = NextResponse.json({
      user: { id, email, username, coins: 10 },
      message: 'Account created! You received 10 free Genie Coins!'
    }, { status: 201 });

    response.cookies.set('genie_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
