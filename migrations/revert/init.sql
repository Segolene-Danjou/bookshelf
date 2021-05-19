-- Revert my_bookshelf:init from pg

BEGIN;

DROP TABLE "book_has_author";

DROP TABLE "book_has_genre";

DROP TABLE "book";

DROP TABLE "publisher";

DROP TABLE "author";

DROP TABLE "genre";

DROP DOMAIN "url";

DROP DOMAIN "pint";

COMMIT;
