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

    const { auctionId } = await request.json();

    if (!auctionId) {
      return NextResponse.json({ error: 'Auction ID is required' }, { status: 400 });
    }

    const db = getDb();

    // Get auction
    const auction = db.prepare('SELECT * FROM auctions WHERE id = ?').get(auctionId) as any;
    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
    }

    if (auction.status !== 'active') {
      return NextResponse.json({ error: 'This auction is not active' }, { status: 400 });
    }

    // Check if auction has ended
    if (new Date(auction.ends_at) < new Date()) {
      db.prepare("UPDATE auctions SET status = 'ended' WHERE id = ?").run(auctionId);
      return NextResponse.json({ error: 'This auction has ended' }, { status: 400 });
    }

    // Check user coins
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(authUser.userId) as any;
    if (user.coins < auction.bid_cost) {
      return NextResponse.json({
        error: `Not enough coins. You need ${auction.bid_cost} coins to bid.`,
        coins_needed: auction.bid_cost,
        current_coins: user.coins
      }, { status: 400 });
    }

    // Process bid in a transaction
    const newPrice = Math.round((auction.current_price + auction.bid_increment) * 100) / 100;

    // Reset timer - add timer_seconds to current time
    const newEndTime = new Date();
    newEndTime.setSeconds(newEndTime.getSeconds() + auction.timer_seconds);

    const placeBid = db.transaction(() => {
      // Deduct coins
      db.prepare("UPDATE users SET coins = coins - ?, updated_at = datetime('now') WHERE id = ?").run(auction.bid_cost, authUser.userId);

      // Record transaction
      db.prepare('INSERT INTO transactions (id, user_id, type, amount, description) VALUES (?, ?, ?, ?, ?)').run(
        uuidv4(), authUser.userId, 'bid', -auction.bid_cost,
        `Bid on "${auction.title}" - Price: $${newPrice.toFixed(2)}`
      );

      // Update auction
      db.prepare(`
        UPDATE auctions 
        SET current_price = ?, total_bids = total_bids + 1, 
            last_bidder_id = ?, last_bidder_name = ?,
            ends_at = ?
        WHERE id = ?
      `).run(newPrice, authUser.userId, authUser.username, newEndTime.toISOString(), auctionId);

      // Record bid
      db.prepare('INSERT INTO bids (id, auction_id, user_id, username, amount) VALUES (?, ?, ?, ?, ?)').run(
        uuidv4(), auctionId, authUser.userId, authUser.username, newPrice
      );
    });

    placeBid();

    const updatedUser = db.prepare('SELECT coins FROM users WHERE id = ?').get(authUser.userId) as any;
    const updatedAuction = db.prepare('SELECT * FROM auctions WHERE id = ?').get(auctionId) as any;

    return NextResponse.json({
      auction: updatedAuction,
      user_coins: updatedUser.coins,
      message: `Bid placed! Price is now $${newPrice.toFixed(2)}`
    });
  } catch (error) {
    console.error('Bid error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
