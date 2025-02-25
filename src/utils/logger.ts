export class Logger {
  static log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  static info(message: string): void {
    console.info(`[INFO] ${message}`);
  }

  static warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}

// Example usage:
// Logger.log('This is a log message');
// Logger.info('This is an info message');
// Logger.warn('This is a warning');
// Logger.error('This is an error'); 