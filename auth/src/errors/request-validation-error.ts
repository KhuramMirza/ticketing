import type { ValidationError } from "express-validator";
import { CustomError } from "./custom-error.js";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public readonly errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors
      .filter((error) => error.type === "field")
      .map((error) => ({
        message: error.msg,
        field: error.path,
      }));
  }
}
