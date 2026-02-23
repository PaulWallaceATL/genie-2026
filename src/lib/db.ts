import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'genie.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      coins INTEGER DEFAULT 0,
      total_ads_watched INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('ad_reward', 'purchase', 'bid', 'auction_win', 'refund')),
      amount INTEGER NOT NULL,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS auctions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      retail_price REAL NOT NULL,
      current_price REAL DEFAULT 0.00,
      bid_increment REAL DEFAULT 0.01,
      bid_cost INTEGER DEFAULT 1,
      total_bids INTEGER DEFAULT 0,
      last_bidder_id TEXT,
      last_bidder_name TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'upcoming', 'ended')),
      ends_at TEXT NOT NULL,
      timer_seconds INTEGER DEFAULT 30,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (last_bidder_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS bids (
      id TEXT PRIMARY KEY,
      auction_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      username TEXT NOT NULL,
      amount REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (auction_id) REFERENCES auctions(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS ad_watches (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      coins_earned INTEGER NOT NULL,
      watched_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS coin_packages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      coins INTEGER NOT NULL,
      price REAL NOT NULL,
      bonus_coins INTEGER DEFAULT 0,
      popular INTEGER DEFAULT 0
    );
  `);

  // Seed coin packages if empty
  const count = db.prepare('SELECT COUNT(*) as count FROM coin_packages').get() as { count: number };
  if (count.count === 0) {
    const insert = db.prepare('INSERT INTO coin_packages (id, name, coins, price, bonus_coins, popular) VALUES (?, ?, ?, ?, ?, ?)');
    insert.run('pkg_starter', 'Starter Pack', 50, 0.99, 0, 0);
    insert.run('pkg_basic', 'Basic Pack', 150, 2.99, 10, 0);
    insert.run('pkg_popular', 'Popular Pack', 500, 7.99, 75, 1);
    insert.run('pkg_mega', 'Mega Pack', 1200, 14.99, 300, 0);
    insert.run('pkg_ultimate', 'Ultimate Pack', 3000, 29.99, 1000, 0);
  }

  // Seed sample auctions if empty
  const auctionCount = db.prepare('SELECT COUNT(*) as count FROM auctions').get() as { count: number };
  if (auctionCount.count === 0) {
    const insertAuction = db.prepare(`
      INSERT INTO auctions (id, title, description, image_url, retail_price, current_price, bid_increment, bid_cost, status, ends_at, timer_seconds)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const futureTime = (minutes: number) => {
      const d = new Date();
      d.setMinutes(d.getMinutes() + minutes);
      return d.toISOString();
    };

    insertAuction.run('auction_1', 'iPhone 16 Pro Max', 'Brand new iPhone 16 Pro Max 256GB - Natural Titanium', '/images/iphone.png', 1199.00, 0.00, 0.01, 1, 'active', futureTime(60), 30);
    insertAuction.run('auction_2', 'MacBook Air M3', 'Apple MacBook Air 15" M3 chip, 16GB RAM, 512GB SSD', '/images/macbook.png', 1299.00, 0.00, 0.01, 1, 'active', futureTime(120), 30);
    insertAuction.run('auction_3', 'PlayStation 5 Pro', 'Sony PlayStation 5 Pro Console with DualSense Controller', '/images/ps5.png', 699.00, 0.00, 0.01, 2, 'active', futureTime(90), 20);
    insertAuction.run('auction_4', 'AirPods Pro 3', 'Apple AirPods Pro 3rd Generation with MagSafe Case', '/images/airpods.png', 249.00, 0.00, 0.01, 1, 'active', futureTime(45), 15);
    insertAuction.run('auction_5', 'Nintendo Switch 2', 'Nintendo Switch 2 Console - OLED Model', '/images/switch.png', 449.00, 0.00, 0.01, 1, 'upcoming', futureTime(180), 30);
    insertAuction.run('auction_6', '$500 Amazon Gift Card', 'Amazon eGift Card worth $500', '/images/amazon.png', 500.00, 0.00, 0.01, 1, 'active', futureTime(30), 10);
  }
}

export default getDb;
