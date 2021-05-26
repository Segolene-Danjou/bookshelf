-- Deploy my_bookshelf:book_function to pg

BEGIN;

CREATE FUNCTION add_book(book json) RETURNS book AS $$
    INSERT INTO "book"
        (
            "reference", 
            "title", 
            "locale", 
            "year", 
            "page_count", 
            "chapter_count", 
            "front_cover", 
            "cover", 
            "publisher_id"
        )
    VALUES(
        (book->>'reference'),
        (book->>'title'),
        (book->>'locale'),
        (book->>'year')::int,
        (book->>'page_count')::int,
        (book->>'chapter_count')::int,
        (book->>'front_cover'),
        (book->>'cover'),
        (book->>'publisher_id')::int
    ) RETURNING *;
$$ LANGUAGE sql;

COMMIT;
