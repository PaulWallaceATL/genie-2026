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
    const transactions = db.prepare(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
    ).all(authUser.userId);

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Transactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
