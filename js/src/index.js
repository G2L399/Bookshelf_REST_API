const Hapi = require("@hapi/hapi");
const routes = require("./routes/bookRoutes.js");
const PORT = 9000;
const HOST = "localhost";

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  const BookRoute = {
    name: "books",
    register: async function (server) {
      server.route(routes);
    },
  };

  await server.register(BookRoute, {
    routes: { prefix: "/books" },
  });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
