-- Revert bookshelf:genres_function from pg

BEGIN;

DROP FUNCTION add_genre;

COMMIT;
