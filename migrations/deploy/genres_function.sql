-- Deploy bookshelf:genres_function to pg

BEGIN;

CREATE FUNCTION add_genre(genre json) RETURNS genre AS $$
    INSERT INTO "genre"
        (
            "label"
        )
    VALUES(
        (genre->>'label')
    ) RETURNING *;
$$ LANGUAGE sql;

COMMIT;
