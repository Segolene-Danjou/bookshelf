-- Deploy bookshelf:publisher_function to pg

BEGIN;


CREATE FUNCTION add_publisher(publisher json) RETURNS publisher AS $$
    INSERT INTO "publisher"
        (
            "name", 
            "country_iso_2"
        )
    VALUES(
        (publisher->>'name'),
        (publisher->>'country_iso_2')
    ) RETURNING *;
$$ LANGUAGE sql;

COMMIT;
