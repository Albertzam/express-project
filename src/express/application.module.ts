import { Module } from "../decorators/getAllRoutes";
import { ExpressService } from "./main/singleton/express.singleton";
import { LoggerExpress } from "./main/singleton/logger.singleton";

@Module({
  providers: [LoggerExpress, ExpressService],
})
export class PrincipalDependenciesSystem {}
