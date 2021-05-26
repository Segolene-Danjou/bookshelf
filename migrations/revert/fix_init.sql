-- Revert my_bookshelf:fix_init from pg

BEGIN;

ALTER DOMAIN "pint"
    DROP CONSTRAINT "pint_check";

ALTER DOMAIN "pint"
    ADD CONSTRAINT pint_check CHECK(VALUE >= 0);

COMMIT;
