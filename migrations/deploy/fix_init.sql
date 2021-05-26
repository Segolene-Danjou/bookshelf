-- Deploy my_bookshelf:fix_init to pg

BEGIN;

ALTER DOMAIN "pint"
    DROP CONSTRAINT "pint_check";

ALTER DOMAIN "pint"
    ADD CONSTRAINT pint_check CHECK(VALUE >= 0);

COMMIT;
