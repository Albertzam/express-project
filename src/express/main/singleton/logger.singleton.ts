import { Lifetime } from "awilix";
import { Injectable } from "../../../decorators/injectable.decorator";
import winston, { Logger, createLogger, format, transports } from "winston";
import chalk from "chalk";

// TODO: Refactor pending
const myCustomLevels = {
  levels: {
    EXPRESS: 0,
    error: 1,
    info: 2,
    war: 3,
    RoutesResolver: 4,
    RouterExplorer: 5,
    crit: 6,
    debug: 7,
  },
  colors: {
    EXPRESS: "green",
    error: "red",
    info: "blue",
    war: "yellow",
    RoutesResolver: "yellow",
    RouterExplorer: "red",
    crit: "red",
    debug: "red",
  },
};

const { printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  try {
    const deserializedMessage = JSON.parse(message);
    return `${chalk.green("[Express]")} ${chalk.yellow(
      `${timestamp}`
    )} [${level}] ${chalk.green(
      `${deserializedMessage.message}`
    )} ${chalk.yellow(`+${deserializedMessage.time}ms`)}`;
  } catch {
    const deserializedMessage = message;
    return `${chalk.green("[Express]")} ${chalk.yellow(
      `${timestamp}`
    )} [${level}] ${chalk.green(`${deserializedMessage}`)}`;
  }
});

@Injectable({ scope: Lifetime.SINGLETON })
export class LoggerExpress {
  private logger: Logger;

  constructor() {
    winston.addColors(myCustomLevels.colors);
    this.logger = createLogger({
      levels: myCustomLevels.levels,
      level: "debug",
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "dd/mm/YYYY hh:mm:ss" }),
        myFormat
      ),
      transports: [new transports.Console()],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  log(level: string, message: string, time: number): void {
    this.logger.log(level, JSON.stringify({ message, time }));
  }
}
