export interface IExpressConfig {
  getPort(): number;
  setPort(port: number): void;
  listen(callback?: () => void): void;
  setPrefix(prefix: string): void;
  getPrefix(): string;
  setVersion(version: string): void;
  getVersion(): string;
}
