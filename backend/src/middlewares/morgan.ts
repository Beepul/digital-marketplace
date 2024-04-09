import morgan from "morgan";
import logger from "../config/logger";


const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

morgan.token("message", function (req, res) {
  return (req as any).message ||  res.statusMessage;
});

const successLogger = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorLogger = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default { successLogger, errorLogger };