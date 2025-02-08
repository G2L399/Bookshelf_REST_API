const { editBookHandler } = require("../controller/editBooks.js");
const { deletebookHandler } = require("../controller/deleteBooks.js");
const {
  getBookHandler,
  getBookWithIDHandler,
} = require("../controller/getBooks.js");
const { addBookHandler } = require("../controller/addbooks.js");

const routes = [
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

module.exports = routes;
