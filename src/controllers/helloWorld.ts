import { Get } from "../decorators/get.decorator";
import { Controller } from "../decorators/controller.decorator";
import { Body } from "../decorators/body.decorator";
import { Post } from "../decorators/post.decorator";
import { IsArray, IsString, MinLength } from "class-validator";
import { BadRequestException } from "../express/errors/badRequest";
import { Auth } from "../decorators/auth.decorator";

export class Testing {
  @IsString()
  @IsArray()
  @MinLength(123)
  a!: number;
}

@Controller("aa")
export class HelloWorld {
  @Get("hello1")
  @Auth({ roles: ["USER"] })
  public hello(@Body() value: any) {
    // console.log("Body >> ", value);
    throw new BadRequestException("ERROR ");
    return { hello: "aaa" };
  }

  @Post("hello2")
  public hello22() {
    return "hello pa";
  }
}
