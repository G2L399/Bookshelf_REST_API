import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { setDefaultBookValues } from "../DefaultValue.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../../data.json");
let books = [];
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};
export const addBookHandler = async (request, h) => {
  let newBook = request.payload;
  newBook.id = crypto.randomUUID();
  newBook = setDefaultBookValues(newBook);
  console.log(request.payload);

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
  saveData();
  const response = h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook.id,
      },
    })
    .code(201);
  return response;
};
