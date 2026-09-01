-- ============================================
-- SYS Alliance — D1 Schema
-- Run with: wrangler d1 execute sys-alliance-db --file=./schema.sql
-- ============================================

CREATE TABLE IF NOT EXISTS gift_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT 'Redeem in-game for rewards',
    date_added TEXT NOT NULL,      -- YYYY-MM-DD
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    date TEXT NOT NULL,            -- YYYY-MM-DD
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,            -- YYYY-MM-DD
    category TEXT NOT NULL DEFAULT 'events', -- ranking|damage|events|war|diplomacy|recruitment
    damage TEXT,                   -- only used when category = damage
    image TEXT,
    highlight INTEGER DEFAULT 0,   -- 0/1
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,            -- YYYY-MM-DD
    time TEXT,                     -- free-text label, e.g. "20:00 UTC"
    category TEXT NOT NULL DEFAULT 'event', -- war|bearhunt|meeting|event|other
    highlight INTEGER DEFAULT 0,   -- 0/1, mark as a key day (e.g. Battle Day) for extra calendar emphasis
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS officers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    icon TEXT DEFAULT 'user',
    color TEXT DEFAULT 'text-slate-400',
    span INTEGER DEFAULT 0,        -- 0/1, whether card spans 2 cols
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Seed data migrated from your existing hardcoded arrays
INSERT INTO gift_codes (code, description, date_added) VALUES
    ('WOSFAMILY26', 'Redeem in-game for rewards', '2026-05-15'),
    ('LoveMom2026', 'Redeem in-game for rewards', '2026-05-10'),
    ('ChildrensDay505', 'Redeem in-game for rewards', '2026-05-05'),
    ('OFFICIALSTORE', 'Redeem in-game for rewards', '2026-04-28'),
    ('GW2026JP', 'Redeem in-game for rewards', '2026-04-30'),
    ('HappyMayDay', 'Redeem in-game or Link for rewards', '2026-05-01');

INSERT INTO officers (name, role, icon, color, span, sort_order) VALUES
    ('JEI', 'Site Admin • Events', 'code', 'text-sys-gold', 0, 1),
    ('PSY', 'Events & Comms', 'bullhorn', 'text-slate-400', 0, 2),
    ('HADES', 'Events & Comms', 'bullhorn', 'text-slate-400', 0, 3),
    ('JM', 'Events & Comms', 'bullhorn', 'text-slate-400', 0, 4),
    ('KERINA', 'Comms • Diplomacy', 'scroll', 'text-slate-400', 1, 5);

INSERT INTO achievements (title, description, date, category, damage, image, highlight) VALUES
    ('BEAR HUNT  DAMAGE BREAKTHROUGH', 'Smashed previous record with 20.4B damage in Bear Hunt BT2 session', '2026-04-24', 'damage', '20.4B', 'img/achievements/bearhunt-record.jpg', 1);
