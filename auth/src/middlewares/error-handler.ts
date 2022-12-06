import { DatabaseConnectionError } from './../errors/database-connection-error';
import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof RequestValidationError) {
    console.log('handling this error as a request validation');
    const formattedErrors = err.errors.map(e => {
      return {
        field: e.param,
        message: e.msg
      }
    })
    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('handling this error as a request connection database');
    return res.status(500).send({
      errors: [
        {
          message: err.reason
        }
      ]
    })

  }
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong!'
      }
    ]
  })
}