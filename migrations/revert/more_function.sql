-- Revert my_bookshelf:more_function from pg

BEGIN;

DROP FUNCTION "update_author";

DROP FUNCTION "delete_author";

COMMIT;
