import { Lifetime } from "awilix";
import { Injectable } from "../decorators/injectable.decorator";

@Injectable()
export class Service {
  sum(): number {
    return 4;
  }
}
