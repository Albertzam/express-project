import { Get } from "../decorators/get.decorator";
import { Controller } from "../decorators/controller.decorator";
import { Body } from "../decorators/body.decorator";
import { Post } from "../decorators/post.decorator";

@Controller("aa")
export class HelloWorld2 {
  @Get("hello3")
  public hello(@Body() value: string) {
    console.log("Body >> ", value);
    return "a";
  }

  @Post("hello4")
  public hello22() {
    return "hello pa";
  }
}
