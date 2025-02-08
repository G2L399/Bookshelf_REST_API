import type { Book } from "./types.ts";

export function setDefaultBookValues(book: Book): Book {
  book.finished = book.finished !== undefined ? book.finished : !book.finished;
  book.reading = book.reading !== undefined ? book.reading : !book.reading;
  book.insertedAt =
    book.insertedAt !== undefined ? book.insertedAt : new Date().toISOString();
  book.updatedAt = new Date().toISOString();

  return book;
}
