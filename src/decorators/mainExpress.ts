import express, { Express } from "express";
export class MainExpress {
  private express: Express;

  constructor() {
    this.express = express();
  }

  setPort(port: number): void {}
}
