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
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};
export const deletebookHandler = async (
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
};
