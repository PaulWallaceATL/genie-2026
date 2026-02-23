import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getAuthUser } from '@/lib/auth';
import getDb from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { packageId } = await request.json();

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    const db = getDb();
    const pkg = db.prepare('SELECT * FROM coin_packages WHERE id = ?').get(packageId) as any;

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const totalCoins = pkg.coins + pkg.bonus_coins;

    // In production, integrate Stripe/IAP here before crediting coins
    // For now, simulate successful purchase
    db.prepare("UPDATE users SET coins = coins + ?, updated_at = datetime('now') WHERE id = ?").run(totalCoins, authUser.userId);

    db.prepare('INSERT INTO transactions (id, user_id, type, amount, description) VALUES (?, ?, ?, ?, ?)').run(
      uuidv4(), authUser.userId, 'purchase', totalCoins,
      `Purchased ${pkg.name}: ${pkg.coins} coins + ${pkg.bonus_coins} bonus`
    );

    const user = db.prepare('SELECT coins FROM users WHERE id = ?').get(authUser.userId) as any;

    return NextResponse.json({
      coins_added: totalCoins,
      total_coins: user.coins,
      package: pkg.name,
      message: `Successfully purchased ${pkg.name}! You received ${totalCoins} Genie Coins!`
    });
  } catch (error) {
    console.error('Buy coins error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const packages = db.prepare('SELECT * FROM coin_packages ORDER BY price ASC').all();
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Get packages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
