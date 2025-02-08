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
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export const getBookWithIDHandler = async (
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
        book,
      },
    })
    .code(200);
  return response;
};

export const getBookHandler = async (
  request: Hapi.Request<Hapi.ReqRefDefaults>,
  h: Hapi.ResponseToolkit<Hapi.ReqRefDefaults>
) => {
  const { reading } = request.query;
  const readingStatus = Boolean(Number(reading));
  if (Boolean(reading)) {
    const newBook = books
      ?.filter((book) => {
        return book.reading === readingStatus;
      })
      .map(({ id, name, publisher }) => {
        return {
          id,
          name,
          publisher,
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
  }
  const newBook = books?.map(({ id, name, publisher }) => {
    return {
      id,
      name,
      publisher,
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
};
