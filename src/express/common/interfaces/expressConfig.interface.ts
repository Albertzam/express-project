export interface IExpressConfig {
  listen(port: number, cb?: () => void): void;
}
