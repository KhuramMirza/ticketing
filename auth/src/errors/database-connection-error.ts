import { CustomError } from "./custom-error.js";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = "Error connecting to the database";
  constructor() {
    super("Error connecting to the database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
