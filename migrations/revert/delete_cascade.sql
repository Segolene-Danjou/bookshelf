-- Revert my_bookshelf:delete_cascade from pg

BEGIN;

ALTER TABLE "book_has_author" DROP CONSTRAINT "book_has_author_author_id_fkey";
ALTER TABLE "book_has_author" ADD CONSTRAINT "book_has_author_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "author"("id");
ALTER TABLE "book_has_author" DROP CONSTRAINT "book_has_author_book_id_fkey";
ALTER TABLE "book_has_author" ADD CONSTRAINT "book_has_author_book_id_fkey" FOREIGN KEY (book_id) REFERENCES "book"("id");

ALTER TABLE "book_has_genre" DROP CONSTRAINT "book_has_genre_genre_id_fkey";
ALTER TABLE "book_has_genre" ADD CONSTRAINT "book_has_genre_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES "genre"("id");
ALTER TABLE "book_has_genre" DROP CONSTRAINT "book_has_genre_book_id_fkey";
ALTER TABLE "book_has_genre" ADD CONSTRAINT "book_has_genre_book_id_fkey" FOREIGN KEY (book_id)  REFERENCES "book"("id");

ALTER TABLE "book" DROP CONSTRAINT "book_publisher_id_fkey";
ALTER TABLE "book" ADD CONSTRAINT "book_publisher_id_fkey" FOREIGN KEY (publisher_id)  REFERENCES "publisher"("id");

COMMIT;
