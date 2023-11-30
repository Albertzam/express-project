import "reflect-metadata";
import express from "express";
import { HelloWorld } from "./controllers/helloWorld";
import { RegisterRoutes } from "./decorators/loadDecorators";

import logger from "./logger";
const bootstrap = async () => {
  const app = express();
  const port = 4444;
  app.use(express.json());
  RegisterRoutes(app)(HelloWorld);

  app.listen(port, () => {
    logger.info(`Servidor escuchando en http://localhost:${port}`);
  });
};

bootstrap();
