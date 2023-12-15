import express, { Express, RequestHandler } from "express";
import { Injectable } from "../../../decorators/injectable.decorator";
import { Lifetime } from "awilix";
import { LoggerExpress } from "./logger.singleton";

@Injectable({ scope: Lifetime.SINGLETON })
export class ExpressService {
  private expressInstance: Express;

  constructor(private readonly loggerExpress: LoggerExpress) {
    this.expressInstance = express();
    this.expressInstance.use(express.json());
    this.loggerExpress.info("Start application...");
  }

  public async listen(port: number, cb: () => void): Promise<void> {
    this.expressInstance.listen(port, cb);
  }

  public stopServer(): void {}

  public getServer(): Express {
    return this.expressInstance;
  }

  public use(...args: Array<any>): void {
    this.expressInstance.use(args);
  }
}
