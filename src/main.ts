import "reflect-metadata";
import express from "express";

import { MainExpress } from "./express";
import { GetControllers } from "./app.module";
import { errorHandler } from "./express/errors/handlerError";
import { LoggerExpress } from "./express/main/singleton/logger.singleton";

const bootstrap = async () => {
  const app = new MainExpress(GetControllers);

  app.use(errorHandler);
  app.listen(4444, () => console.log("initialized server"));
};

bootstrap();
