import { DatabaseConnectionError } from './../errors/database-connection-error';
import { RequestValidationError } from './../errors/request-validation-error';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();


router.post('/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ]
  , (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(JSON.stringify(errors))
    if (!errors.isEmpty()) {
      console.log('errors.array(): ', errors.array())
      throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body;
    console.log('email: ', email);
    console.log('password: ', password);

    console.log('Creating a user...');
    throw new DatabaseConnectionError()

  })


export { router as signupRouter };

