import winston from "winston";
import chalk from "chalk";

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((info) => {
      const { timestamp, level, message } = info;
      const coloredLine = chalk.keyword("blue")(
        `[${timestamp}] [${level}] ${message}`
      );
      return coloredLine;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
