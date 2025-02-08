import Hapi from "@hapi/hapi";
import { editBookHandler } from "../controller/editBooks.ts";
import { deletebookHandler } from "../controller/deleteBooks.ts";
import {
  getBookHandler,
  getBookWithIDHandler,
} from "../controller/getBooks.ts";
import { addBookHandler } from "../controller/addbooks.ts";

export const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
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
