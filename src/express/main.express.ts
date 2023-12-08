import { ClassConstructor } from "class-transformer";
import express, { Express } from "express";
import { ConfigRoutes } from "./loadRoutes";
import { IExpressConfig } from "./common";

export class MainExpress implements IExpressConfig {
  public version!: string;
  private port!: number;
  static express: Express;
  static middlewares: Array<unknown>;
  private getAllControllers: ClassConstructor<unknown>;
  public prefix: string = "api";

  constructor(appModule: any) {
    this.getAllControllers = appModule;
  }

  public create(): Express {
    if (MainExpress.express) return MainExpress.express;
    return (MainExpress.express = express());
  }

  loadRoutes(): void {
    const routes = new ConfigRoutes(
      this.getAllControllers,
      MainExpress.express,
      this.prefix
    );
    routes.loadRoutes();
  }

  listen(callback?: () => void): void {
    MainExpress.express.listen(this.port, callback);
  }

  use(...handlers: Array<any>): void {
    MainExpress.express.use(handlers);
  }

  getPort(): number {
    return this.port;
  }

  setPort(port: number): void {
    this.port = port;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  getPrefix(): string {
    return this.prefix;
  }

  setVersion(version: string): void {
    this.version = version;
  }

  getVersion(): string {
    return this.version;
  }
}
