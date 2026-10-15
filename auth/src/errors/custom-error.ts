type SerializeErrors = {
  message: string;
  field?: string;
}[];

export abstract class CustomError extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): SerializeErrors;
}
