const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data.json");
let books = [];
const fileData = fs.readFileSync(filePath, "utf8");
if (fs.existsSync(filePath)) {
  if (fileData === "") {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  } else {
    books = JSON.parse(fileData);
  }
}
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};
const editBookHandler = async (request, h) => {
  const { id } = request.params;
  const newBook = request.payload;
  const book = books.find((book) => book.id === id);
  if (book === undefined) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
    return response;
  }
  book.updatedAt = new Date().toISOString();

  if (newBook.name === undefined) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }
  if (newBook.readPage > newBook.pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }
  Object.keys(book).forEach((key) => {
    if (newBook[key] !== undefined) {
      book[key] = newBook[key];
    }
  });
  const bookStatus = newBook.reading;
  if (bookStatus !== undefined) {
    book.reading = bookStatus;
    book.finished = book.readPage === book.pageCount;
  }
  saveData();
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
      book,
    })
    .code(200);
  return response;
};

module.exports = { editBookHandler };
