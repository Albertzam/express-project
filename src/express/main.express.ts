import { IExpressConfig } from "./common";
import { DependencyPrincipalSetup } from "./main";
import { ContainerModule } from "./main/containerModule";
import { ExpressService } from "./main/singleton/express.singleton";
import { toCamelCase } from "../decorators/common/toCamelCase";
import { MappingApplication } from "./main/mappingApplication";
import { ClassConstructor } from "class-transformer";

export class MainExpress implements IExpressConfig {
  private express: ExpressService;
  private dependencyPrincipalService: DependencyPrincipalSetup;
  private containerPrincipal: ContainerModule;
  private mappingApplication: MappingApplication;

  constructor(appModule: ClassConstructor<unknown>) {
    this.dependencyPrincipalService = new DependencyPrincipalSetup();
    this.dependencyPrincipalService.configurePrincipalDependencies();
    this.containerPrincipal = new ContainerModule();
    this.express = this.containerPrincipal.resolve<ExpressService>(
      toCamelCase(ExpressService.name)
    );
    this.mappingApplication =
      this.containerPrincipal.resolve<MappingApplication>(
        toCamelCase(MappingApplication.name)
      );
    this.mappingApplication.initializeMappingInController(appModule);
  }

  listen(port: number, cb: () => void): void {
    this.express.listen(port, cb);
  }

  use(...handlers: Array<any>): void {
    this.express.use(handlers);
  }
}
