import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getAuthUser } from '@/lib/auth';
import getDb from '@/lib/db';

const COINS_PER_AD = 2;
const COOLDOWN_SECONDS = 10; // 10 second cooldown between ads (for demo; increase in production)

export async function POST() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const db = getDb();

    // Check cooldown
    const lastWatch = db.prepare(
      'SELECT watched_at FROM ad_watches WHERE user_id = ? ORDER BY watched_at DESC LIMIT 1'
    ).get(authUser.userId) as any;

    if (lastWatch) {
      const lastTime = new Date(lastWatch.watched_at).getTime();
      const now = Date.now();
      const diff = (now - lastTime) / 1000;
      if (diff < COOLDOWN_SECONDS) {
        const remaining = Math.ceil(COOLDOWN_SECONDS - diff);
        return NextResponse.json({
          error: `Please wait ${remaining} seconds before watching another ad`,
          cooldown: remaining
        }, { status: 429 });
      }
    }

    // Record ad watch
    db.prepare('INSERT INTO ad_watches (id, user_id, coins_earned) VALUES (?, ?, ?)').run(uuidv4(), authUser.userId, COINS_PER_AD);

    // Update user coins and ad count
    db.prepare("UPDATE users SET coins = coins + ?, total_ads_watched = total_ads_watched + 1, updated_at = datetime('now') WHERE id = ?").run(COINS_PER_AD, authUser.userId);

    // Record transaction
    db.prepare('INSERT INTO transactions (id, user_id, type, amount, description) VALUES (?, ?, ?, ?, ?)').run(
      uuidv4(), authUser.userId, 'ad_reward', COINS_PER_AD, `Earned ${COINS_PER_AD} coins from watching an ad`
    );

    const user = db.prepare('SELECT coins, total_ads_watched FROM users WHERE id = ?').get(authUser.userId) as any;

    return NextResponse.json({
      coins_earned: COINS_PER_AD,
      total_coins: user.coins,
      total_ads_watched: user.total_ads_watched,
      message: `You earned ${COINS_PER_AD} Genie Coins!`
    });
  } catch (error) {
    console.error('Watch ad error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
