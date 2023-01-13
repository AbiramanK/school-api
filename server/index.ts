import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
// import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { sequelize } from "./dbconfig";
import { authChecker } from "../middlewares/AuthMiddleware";

async function startServer() {
  const schema = await buildSchema({
    resolvers: [__dirname + "/../app/**/resolver.{ts,js}"],
    authChecker,
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const headers = req?.headers;
      if (headers?.authorization!) {
        const token = headers?.authorization!?.split(" ")![1] ?? "";
        const context = {
          token,
        };

        return context;
      }
    },
    persistedQueries: false,
  });

  try {
    await sequelize.authenticate();
    console.info("✔✔ Databse Connection has been established successfully.");
  } catch (error) {
    console.error("❌❌ Database Unable to connect to the database:", error);
  }

  const PORT = parseInt(process.env.NODE_APP_SERVER_PORT ?? "8001");

  const HOST = process.env.NODE_APP_SERVER_HOST ?? "localhost";

  await server.start();

  const app = express();

  app.get("/", (req, res) => {
    res.sendStatus(200);
  });

  server.applyMiddleware({ app });

  var listener = app.listen({ host: HOST, port: PORT }, function () {
    console.log(listener?.address());
    console.info(`🚀  Server ready at http://${HOST}:${PORT}`);
  });

  // server.listen({ host: HOST, port: PORT }).then(({ url }) => {
  //   console.info(`🚀  Server ready at ${url}`);
  // });
}

startServer();
