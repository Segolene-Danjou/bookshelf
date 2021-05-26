-- Revert my_bookshelf:function from pg

BEGIN;

DROP FUNCTION "add_author";

DROP FUNCTION "book_preview";

COMMIT;
