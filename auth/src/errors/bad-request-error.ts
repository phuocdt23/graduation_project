import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message);
    
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  StatusCode = 400;
  serializeErrors() {
    return [
      {
        message: this.message
      }
    ]
  }

}