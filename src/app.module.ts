import { HelloWorld } from "./controllers/helloWorld";
import { HelloWorld2 } from "./controllers/helloWorldCopy";
import { Module } from "./decorators/getAllRoutes";
import { ExampleService } from "./services/example.service";
import { Service } from "./services/inject.service";
import { ExampleSingleton } from "./services/single.service";
import { UserService } from "./services/user.service";

@Module({
  controllers: [HelloWorld],
  providers: [ExampleService, Service, ExampleSingleton, UserService],
})
export class GetControllers {}
