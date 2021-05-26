-- Deploy my_bookshelf:function to pg

BEGIN;

CREATE FUNCTION add_author(author json) RETURNS author AS $$
    INSERT INTO "author"
    ("firstname", "lastname", "country_iso_2", "birthdate", "deathdate")
    VALUES(
        (author->>'firstname'),
        (author->>'lastname'),
        (author->>'country_iso_2'),
        (author->>'birthdate')::timestamptz,
        (author->>'deathdate')::timestamptz
    ) RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION book_preview() RETURNS SETOF book AS $$
    SELECT * FROM "book" ORDER BY random() LIMIT 3
$$ LANGUAGE sql;


COMMIT;
