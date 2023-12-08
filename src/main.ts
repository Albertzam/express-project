import "reflect-metadata";
import express from "express";
import { HelloWorld } from "./controllers/helloWorld";
import { RegisterRoutes } from "./decorators/loadDecorators";

import logger from "./logger";
import { MainExpress } from "./express";
import { GetControllers } from "./app.module";
import { errorHandler } from "./express/errors/handler";

const bootstrap = async () => {
  const app = new MainExpress(GetControllers);
  app.create();
  app.use(express.json());

  app.setPort(4444);
  app.loadRoutes();
  app.use(errorHandler);
  app.listen(() => console.log("initialized server"));
};

bootstrap();
