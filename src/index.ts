import Hapi from "@hapi/hapi";
import { books } from "../types";
const PORT = 9000;
const HOST = "localhost";
const Book: books[] = [
  {
    id: "1",
    name: "Buku 1",
    year: 2020,
    author: "author 1",
    summary: "summary 1",
    publisher: "publisher 1",
    pageCount: 100,
    readPage: 50,
    finished: false,
    reading: true,
    insertedAt: "",
    updatedAt: "",
  },
  {
    id: "1",
    name: "Buku 1",
    year: 2020,
    author: "author 1",
    summary: "summary 1",
    publisher: "publisher 1",
    pageCount: 100,
    readPage: 50,
    finished: false,
    reading: true,
    insertedAt: "",
    updatedAt: "",
  },
];

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
