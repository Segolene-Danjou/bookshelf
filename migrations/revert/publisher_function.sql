-- Revert bookshelf:publisher_function from pg

BEGIN;

DROP FUNCTION add_publisher;

COMMIT;
