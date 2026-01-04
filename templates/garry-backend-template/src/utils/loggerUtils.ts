import { createLogger, format, transports } from 'winston';

export type LogLevel = 'info' | 'error' | 'warn' | 'debug';

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export function logMessage(
  level: LogLevel,
  message: string,
  payload?: unknown,
  context?: string,
  fileName?: string,
  functionName?: string
) {
  const logFn = logger[level] ? logger[level].bind(logger) : logger.log.bind(logger, level);
  logFn(message, {
    payload,
    context,
    fileName,
    functionName,
  });
}

export function loggerInfo(
  message: string,
  payload?: unknown,
  context?: string,
  fileName?: string,
  functionName?: string
) {
  logMessage('info', message, payload, context, fileName, functionName);
}

export function loggerError(
  message: string,
  payload?: unknown,
  context?: string,
  fileName?: string,
  functionName?: string
) {
  logMessage('error', message, payload, context, fileName, functionName);
}

export function loggerWarn(
  message: string,
  payload?: unknown,
  context?: string,
  fileName?: string,
  functionName?: string
) {
  logMessage('warn', message, payload, context, fileName, functionName);
}

export function loggerDebug(
  message: string,
  payload?: unknown,
  context?: string,
  fileName?: string,
  functionName?: string
) {
  logMessage('debug', message, payload, context, fileName, functionName);
}
