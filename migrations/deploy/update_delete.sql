-- Deploy my_bookshelf:more_function to pg

BEGIN;

CREATE FUNCTION update_book(book_input json) RETURNS book AS $$
    UPDATE "book" SET
    "reference" = book_input->>'reference', 
    "title" = book_input->>'title', 
    "locale" = book_input->>'locale', 
    "year" = (book_input->>'year')::int, 
    "page_count" = (book_input->>'page_count')::int, 
    "chapter_count" = (book_input->>'chapter_count')::int,
    "front_cover" = book_input->>'front_cover', 
    "cover" = book_input->>'cover', 
    "publisher_id" = (book_input->>'publisher_id')::int
    WHERE "id" = (book_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_book(id_input int) RETURNS void AS $$
    UPDATE "book" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

CREATE FUNCTION update_publisher(publisher_input json) RETURNS publisher AS $$
    UPDATE "publisher" SET
    "name" = publisher_input->>'name', 
    "country_iso_2" = publisher_input->>'country_iso_2'
    WHERE "id" = (publisher_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_publisher(id_input int) RETURNS void AS $$
    UPDATE "publisher" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

CREATE FUNCTION update_genre(genre_input json) RETURNS genre AS $$
    UPDATE "genre" SET
    "label" = genre_input->>'label'
    WHERE "id" = (genre_input->>'id')::int
    RETURNING *;
$$ LANGUAGE sql;

CREATE FUNCTION delete_genre(id_input int) RETURNS void AS $$
    UPDATE "genre" SET
    "deleted_at" = now()
    WHERE id = id_input
$$ LANGUAGE sql;

COMMIT;
