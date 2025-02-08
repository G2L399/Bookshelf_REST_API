import { editBookHandler } from "../controller/editBooks.js";
import { deletebookHandler } from "../controller/deleteBooks.js";
import {
  getBookHandler,
  getBookWithIDHandler,
} from "../controller/getBooks.js";
import { addBookHandler } from "../controller/addbooks.js";

export const routes = [
  {
    method: "POST",
    path: "/",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/",
    handler: getBookHandler,
  },
  {
    method: "GET",
    path: "/{id}",
    handler: getBookWithIDHandler,
  },
  {
    method: "PUT",
    path: "/{id}",
    handler: editBookHandler,
  },
  {
    method: "DELETE",
    path: "/{id}",
    handler: deletebookHandler,
  },
];
