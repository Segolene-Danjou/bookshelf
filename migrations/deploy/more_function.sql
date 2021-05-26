-- Deploy my_bookshelf:more_function to pg

BEGIN;

CREATE FUNCTION update_author(author_input json) RETURNS author AS $$
    UPDATE "author" SET
    "firstname" = author_input->>'firstname', 
    "lastname" = author_input->>'lastname', 
    "country_iso_2" = author_input->>'country_iso_2', 
    "birthdate" = (author_input->>'birthdate')::timestamptz, 
    "deathdate" = (author_input->>'deathdate')::timestamptz
    WHERE "id" = (author_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_author(id_input int) RETURNS void AS $$
    -- DELETE FROM "author" WHERE "id" = id_input;
    -- On préfère un soft delete
    UPDATE "author" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

COMMIT;
