const defaultString = "Application";

export const enum MetadataKeysApplication {
  MODULE = `${defaultString}:module`,
  MIDDLEWARES = `${defaultString}:middlewares`,
  CATCH = `${defaultString}:catch`,
  CONTROLLERS = `${defaultString}:controllers`,
  PROVIDERS = `${defaultString}:providers`,
  ROUTES = `${defaultString}:routes`,
}
