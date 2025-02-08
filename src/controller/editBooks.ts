import Hapi from "@hapi/hapi";
import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

interface Book {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished?: boolean;
  reading?: boolean;
  insertedAt?: string;
  updatedAt?: string;
  [key: string]: string | number | boolean | undefined; // Add index signature
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../../data.json");
let books: Book[] = [];
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
export const editBookHandler = async (
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) => {
  const { id } = request.params;
  const newBook = request.payload as Book;
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
  Object.keys(book).forEach((key: string) => {
    if (newBook[key] !== undefined) {
      (book as Book)[key] = newBook[key]!;
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
