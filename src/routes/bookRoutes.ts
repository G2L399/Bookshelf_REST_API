import Hapi from "@hapi/hapi";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { editBookHandler } from "../controller/editBooks.ts";
import { deletebookHandler } from "../controller/deleteBooks.ts";
import {
  getBookHandler,
  getBookWithIDHandler,
} from "../controller/getBooks.ts";
import { addBookHandler } from "../controller/addbooks.ts";

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
