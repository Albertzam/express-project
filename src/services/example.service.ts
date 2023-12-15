import { Lifetime } from "awilix";
import { Injectable } from "../decorators/injectable.decorator";
// import { Service } from "./inject.service";

import { Service } from "./inject.service";
import { ExampleSingleton } from "./single.service";

@Injectable()
export class ExampleService {
  constructor(
    private readonly service: Service,
    private readonly exampleSingleton: ExampleSingleton
  ) {}

  getSum(): number {
    return this.exampleSingleton.sum();
  }

  getNumber(): number {
    return this.exampleSingleton.getRandomNumber();
  }
}
