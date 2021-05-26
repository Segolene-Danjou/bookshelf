-- Revert my_bookshelf:book_function from pg

BEGIN;

DROP FUNCTION add_book;

COMMIT;
