export abstract class CustomError extends Error {
  abstract StatusCode: number;
  abstract serializeErrors(): { message: string, field?: string }[];
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}