-- Revert bookshelf:update_delete from pg

BEGIN;

DROP FUNCTION delete_genre;

DROP FUNCTION update_genre;

DROP FUNCTION delete_publisher;

DROP FUNCTION update_publisher;

DROP FUNCTION delete_book;


DROP FUNCTION update_book;


COMMIT;
