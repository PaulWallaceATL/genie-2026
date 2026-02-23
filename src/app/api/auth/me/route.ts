import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const db = getDb();
    const user = db.prepare('SELECT id, email, username, coins, total_ads_watched, created_at FROM users WHERE id = ?').get(authUser.userId) as any;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
