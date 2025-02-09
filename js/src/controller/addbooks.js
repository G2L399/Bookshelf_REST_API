const fs = require("fs");
const path = require("path");
const { setDefaultBookValues } = require("../DefaultValue.js");

const filePath = path.join(__dirname, "../../data.json");
let books = [];
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};
const addBookHandler = async (request, h) => {
  let newBook = request.payload;
  console.log("bro what   ", newBook);

  newBook.id = crypto.randomUUID();
  newBook = setDefaultBookValues(newBook);
  console.log("bro what   ", newBook);

  if (newBook.name === undefined) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }
  if (newBook.readPage > newBook.pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }
  books.push(newBook);
  console.log(newBook);

  saveData();
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        status: 201,
        bookId: newBook.id,
      },
    })
    .code(201);
  return response;
};

module.exports = { addBookHandler };
