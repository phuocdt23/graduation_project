import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  constructor() {
    super("You're not authorized to access this route");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  StatusCode = 404;
  reason = "You're not authorized to access this route";
  serializeErrors() {
    return [
      {
        message: this.reason
      }
    ]
  }

}