import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    
    // Auto-end expired auctions
    db.prepare(`
      UPDATE auctions SET status = 'ended' 
      WHERE status = 'active' AND ends_at < datetime('now')
    `).run();

    // Auto-activate upcoming auctions that should be active
    db.prepare(`
      UPDATE auctions SET status = 'active'
      WHERE status = 'upcoming' AND ends_at > datetime('now')
      AND datetime(created_at, '+1 hour') < datetime('now')
    `).run();

    const auctions = db.prepare(`
      SELECT * FROM auctions 
      WHERE status IN ('active', 'upcoming')
      ORDER BY 
        CASE status WHEN 'active' THEN 0 WHEN 'upcoming' THEN 1 END,
        ends_at ASC
    `).all();

    return NextResponse.json({ auctions });
  } catch (error) {
    console.error('Get auctions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
