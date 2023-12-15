import { AwilixContainer, asClass } from "awilix";
import { ClassConstructor } from "class-transformer";
import { ErrorMessagesApp } from "../errors/errorsApplication";
import { getContainer } from "./singleton/container.singleton";
import { toCamelCase } from "../../decorators/common/toCamelCase";

export class ContainerModule {
  private container: AwilixContainer;

  constructor() {
    this.container = getContainer();
  }

  private getConfigsProviders(
    anyClass: ClassConstructor<unknown>,
    metadataKey: string
  ) {
    const config = Reflect.getMetadata(metadataKey, anyClass);

    if (!config)
      throw new Error(
        `${ErrorMessagesApp.REGISTER_CLASS_DEPENDENCIES} ${anyClass.name}`
      );

    return config;
  }

  public registerClassDependencies(
    dependencies: Array<ClassConstructor<unknown>>,
    metadataKey: string
  ): void {
    dependencies.forEach((anyClass) => {
      const options = this.getConfigsProviders(anyClass, metadataKey);
      this.container.register({
        [options.name]: asClass(anyClass).setLifetime(options.scope),
      });
    });
  }

  public registerAnyClassInModeSingleton(
    anyClass: ClassConstructor<unknown>
  ): void {
    this.container.register({
      [toCamelCase(anyClass.name)]: asClass(anyClass).singleton(),
    });
  }

  public registerAnyClassInModeDefault(
    anyClass: ClassConstructor<unknown>
  ): void {
    this.container.register({
      [toCamelCase(anyClass.name)]: asClass(anyClass),
    });
  }

  public resolve<T extends { [key: string]: any }>(dependencyName: string): T {
    const anyInstance: T = this.container.resolve(toCamelCase(dependencyName));

    if (!anyInstance)
      throw new Error(`Dependency ${dependencyName} not found in modules`);

    return anyInstance;
  }
}
