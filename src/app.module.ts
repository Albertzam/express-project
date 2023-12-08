import { HelloWorld } from "./controllers/helloWorld";
import { HelloWorld2 } from "./controllers/helloWorld copy";
import { GetAllControllers } from "./decorators/getAllRoutes";

@GetAllControllers({ controllers: [HelloWorld, HelloWorld2] })
export class GetControllers {}
