import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../../data.json");
let books = [];
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};
export const deletebookHandler = async (request, h) => {
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
