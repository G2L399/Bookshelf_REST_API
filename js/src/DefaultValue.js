export function setDefaultBookValues(book) {
  book.finished = book.finished !== undefined ? book.finished : !book.finished;
  book.reading = book.reading !== undefined ? book.reading : !book.reading;
  book.insertedAt =
    book.insertedAt !== undefined ? book.insertedAt : new Date().toISOString();
  book.updatedAt = new Date().toISOString();

  return book;
}
