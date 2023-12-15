import { HttpStatus } from "../../common";

export class BadRequestException extends Error {
  public code: number;

  constructor(message: string | Array<string>) {
    super(
      typeof message === "string"
        ? message
        : JSON.stringify({ validator: message })
    );
    this.code = HttpStatus.BAD_REQUEST;
  }
}
