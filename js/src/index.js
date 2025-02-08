import Hapi from "@hapi/hapi";
import { routes } from "./routes/bookRoutes.js";
const PORT = 9000;
const HOST = "localhost";

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
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
