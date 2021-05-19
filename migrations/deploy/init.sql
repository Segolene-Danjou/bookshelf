-- Deploy my_bookshelf:init to pg

BEGIN;

CREATE DOMAIN url AS text
CHECK (VALUE ~ 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)');
COMMENT ON DOMAIN url IS 'match URLs (http or https)';

CREATE DOMAIN pint AS int
CHECK (VALUE > 0);
COMMENT ON DOMAIN pint IS 'only positive integer is accepted';

CREATE TABLE "publisher" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "country_iso_2" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz
);

CREATE TABLE "author" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "country_iso_2" text NOT NULL,
    "birthdate" timestamptz NOT NULL,
    "deathdate" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz
);

CREATE TABLE "genre" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz
);

CREATE TABLE "book" (
    "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "reference" text NOT NULL,
    "title" text NOT NULL,
    "locale" text NOT NULL DEFAULT 'fr_FR',
    "year" pint,
    "page_count" pint NOT NULL,
    "chapter_count" pint NOT NULL DEFAULT 0,
    "front_cover" text NOT NULL,
    "cover" url,
    "publisher_id" integer NOT NULL REFERENCES "publisher"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    UNIQUE ("publisher_id", "reference"),
    UNIQUE ("publisher_id", "title")
);

CREATE TABLE "book_has_author" (
    "book_id" integer NOT NULL REFERENCES "book"("id"),
    "author_id" integer NOT NULL REFERENCES "author"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("book_id", "author_id")
);

CREATE TABLE "book_has_genre" (
    "book_id" integer NOT NULL REFERENCES "book"("id"),
    "genre_id" integer NOT NULL REFERENCES "genre"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("book_id", "genre_id")
);

COMMIT;
