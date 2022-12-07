import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  StatusCode = 500;
  reason = 'Error to connecting to database';
  constructor() {
    super('Error to connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [
      { message: this.reason },
    ]
  }
}