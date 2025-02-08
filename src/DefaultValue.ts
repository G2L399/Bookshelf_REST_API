import type { Book } from "./types.ts";

export function setDefaultBookValues(book: Book): Book {
  book.finished = book.reading !== undefined ? book.reading : false;
  book.reading = book.reading !== undefined ? book.reading : false;
  book.insertedAt =
    book.insertedAt !== undefined ? book.insertedAt : new Date().toISOString();
  book.updatedAt = new Date().toISOString();

  return book;
}
