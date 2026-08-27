-- ============================================
-- Migration: add events table (in-site alliance calendar)
-- Run against your EXISTING database with:
--   wrangler d1 execute sys-alliance-db-test --file=./migrations/002_add_events.sql
-- (schema.sql has also been updated so fresh databases get this table too.)
-- ============================================

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,            -- YYYY-MM-DD
    time TEXT,                     -- free-text label, e.g. "20:00 UTC"
    category TEXT NOT NULL DEFAULT 'event', -- war|bearhunt|meeting|event|other
    created_at TEXT DEFAULT (datetime('now'))
);
