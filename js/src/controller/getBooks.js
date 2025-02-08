const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data.json");
let books = [];
if (fs.existsSync(filePath)) {
  books = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const getBookWithIDHandler = async (request, h) => {
  const { id } = request.params;
  const books = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const book = books.find((book) => book.id === id);
  if (!book) {
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
        status: 200,
        book,
      },
    })
    .code(200);
  return response;
};

const getBookHandler = async (request, h) => {
  const { reading, finished, name } = request.query;
  const readingStatus = Boolean(Number(reading));
  const finishedStatus = Boolean(Number(finished));
  const bookName = name?.toString().toLowerCase();
  let newBook = [];
  let response;
  if (reading) {
    newBook = books
      ?.filter(({ reading }) => reading === readingStatus)
      .map(({ id, name, publisher }) => {
        return {
          id,
          name,
          publisher,
        };
      });
    response = h
      .response({
        status: "success",
        data: {
          status: 200,
          books: newBook,
        },
      })
      .code(200);
  } else if (finished) {
    newBook = books
      ?.filter(({ finished }) => finished === finishedStatus)
      .map(({ id, name, publisher }) => {
        return {
          id,
          name,
          publisher,
        };
      });
    response = h
      .response({
        status: "success",
        data: {
          status: 200,
          books: newBook,
        },
      })
      .code(200);
  } else if (name) {
    newBook = books
      ?.filter(({ name }) => name.toLowerCase().includes(bookName))
      .map(({ id, name, publisher }) => {
        return {
          id,
          name,
          publisher,
        };
      });
    response = h
      .response({
        status: "success",
        data: {
          status: 200,
          books: newBook,
        },
      })
      .code(200);
  } else {
    newBook = books?.map(({ id, name, publisher }) => {
      return {
        id,
        name,
        publisher,
      };
    });
    if (newBook.length === 0) {
      response = h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
      return response;
    } else {
      response = h
        .response({
          status: "success",
          data: {
            status: 200,
            books: newBook,
          },
        })
        .code(200);
    }
  }

  return response;
};

module.exports = { getBookHandler, getBookWithIDHandler };
