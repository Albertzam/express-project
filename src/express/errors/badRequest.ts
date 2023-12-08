import { HttpStatus } from "../../common";

export class BadRequestException extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.code = HttpStatus.BAD_REQUEST;
  }
}
