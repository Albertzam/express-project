import { HelloWorld } from "./controllers/helloWorld";
import { HelloWorld2 } from "./controllers/helloWorldCopy";
import { Module } from "./decorators/getAllRoutes";
import { ExampleService } from "./services/example.service";
import { Service } from "./services/inject.service";
import { ExampleSingleton } from "./services/single.service";

@Module({
  controllers: [HelloWorld, HelloWorld2],
  providers: [ExampleService, Service, ExampleSingleton],
})
export class GetControllers {}
