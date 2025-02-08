import Hapi from "@hapi/hapi";
import crypto from "crypto";
import { setDefaultBookValues } from "../DefaultValue.ts";
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
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}
console.log(path.resolve(filePath));
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

export const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: "POST",
    path: "/",
    handler: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      let newBook = request.payload as Book;
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
    },
  },
  {
    method: "GET",
    path: "/",
    handler: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      console.log(books);

      const newBook = books?.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });

      const response = h
        .response({
          status: "success",
          data: {
            books: newBook,
          },
        })
        .code(200);
      return response;
    },
  },
  {
    method: "GET",
    path: "/{id}",
    handler: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      const { id } = request.params;

      const book = books.find((book) => {
        const newBook = book.id === id;
        return newBook;
      });
      if (book === undefined) {
        const response = h
          .response({
            status: "fail",
            message: "Buku tidak ditemukan",
          })
          .code(404);
        return response;
      }
      const response = h
        .response({
          status: "success",
          data: {
            book: book,
          },
        })
        .code(200);
      return response;
    },
  },
  {
    method: "PUT",
    path: "/{id}",
    handler: async (
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
      saveData();
      const response = h
        .response({
          status: "success",
          message: "Buku berhasil diperbarui",
        })
        .code(200);
      return response;
    },
  },
  {
    method: "DELETE",
    path: "/{id}",
    handler: async (
      request: Hapi.Request<Hapi.ReqRefDefaults>,
      h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
    ) => {
      const { id } = request.params;
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        const response = h
          .response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
          })
          .code(404);
        return response;
      }
      books.splice(bookIndex, 1);
      saveData();
      const response = h
        .response({
          status: "success",
          message: "Buku berhasil dihapus",
        })
        .code(200);
      return response;
    },
  },
];
