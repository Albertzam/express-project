import { Lifetime } from "awilix";
import { Injectable } from "../decorators/injectable.decorator";

@Injectable({ scope: Lifetime.SINGLETON })
export class ExampleSingleton {
  private randomNumber = 0;

  sum() {
    this.randomNumber += 2;
    return this.randomNumber;
  }

  getRandomNumber() {
    console.log("RANDOM NUMBER >> ", this.randomNumber);
    return this.randomNumber;
  }
}
