import { Get } from "../decorators/get.decorator";
import { Controller } from "../decorators/controller.decorator";
import { Body } from "../decorators/body.decorator";
import { IsNumber } from "class-validator";

import { Exclude } from "class-transformer";
import { ExampleService } from "../services/example.service";
import { UseMiddleware } from "../decorators/useMiddleware.decorator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
export class Testing {
  @IsNumber()
  // @Exclude()
  testing!: number;
}

export class Testing2 {
  @IsNumber()
  @Exclude()
  testing!: number;

  constructor(partial: Partial<Testing2>) {
    Object.assign(this, partial);
  }
}

@Controller("aa")
export class HelloWorld {
  // private _s: ExampleService;
  constructor(private readonly exampleService: ExampleService) {}
  @Get("hello1")
  @UseMiddleware(AuthMiddleware)
  async hello(@Body() value: Testing): Promise<any> {
    return { testing: 12313 };
  }

  @Get("hello2")
  public hello22() {
    this.exampleService.getNumber();
    return "hello pa";
  }
}
