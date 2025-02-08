export function setDefaultBookValues(book) {
  book.finished = book.finished == undefined ? false : book.finished;
  book.reading = book.reading == undefined ? false : book.reading;
  book.insertedAt =
    book.insertedAt !== undefined ? book.insertedAt : new Date().toISOString();
  book.updatedAt = new Date().toISOString();

  return book;
}
