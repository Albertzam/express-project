import { Request } from "express";

import { Get } from "../decorators/get.decorator";
import { Controller } from "../decorators/controller.decorator";
import { Body } from "../decorators/body.decorator";

@Controller("aa")
export class HelloWorld {
  @Get("hello1")
  public hello(@Body() value: string) {
    console.log("Body >> ", value);
    return "a";
  }

  @Get("hello2")
  public hello22() {
    return "hello pa";
  }
}
