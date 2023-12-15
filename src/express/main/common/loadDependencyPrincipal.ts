import { MetadataKeysApplication } from "../../../decorators/common/metadataApplication.keys";
import { PrincipalDependenciesSystem } from "../../application.module";
import { ContainerModule } from "../containerModule";
import { MappingApplication } from "../mappingApplication";

export class DependencyPrincipalSetup {
  private containerInstance: ContainerModule;

  constructor() {
    this.containerInstance = new ContainerModule();
  }

  /**
   * Load in the container instance for express
   * Load in the container instance logger to use in application
   */
  configurePrincipalDependencies(): void {
    const principalDependencies = Reflect.getMetadata(
      MetadataKeysApplication.MODULE,
      PrincipalDependenciesSystem
    );

    if (!principalDependencies)
      throw new Error("Error to initialize principal dependencies system");

    this.containerInstance.registerClassDependencies(
      principalDependencies.providers,
      MetadataKeysApplication.PROVIDERS
    );

    this.containerInstance.registerAnyClassInModeDefault(MappingApplication);
  }
}
