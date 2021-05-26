-- Revert my_bookshelf:author_unique from pg

BEGIN;

ALTER TABLE "author"
    DROP CONSTRAINT "author_unique";

COMMIT;
