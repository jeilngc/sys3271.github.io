-- ============================================
-- Migration: add "highlight" flag to events (mark battle day / key day)
-- Run against your EXISTING database with:
--   wrangler d1 execute sys-alliance-db-test --file=./migrations/003_add_event_highlight.sql
-- (schema.sql has also been updated so fresh databases get this column too.)
-- ============================================

ALTER TABLE events ADD COLUMN highlight INTEGER DEFAULT 0;
