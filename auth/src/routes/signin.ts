import { validateRequest } from './../middlewares/validate-request';
import express from 'express';
import { body } from 'express-validator';

const router = express.Router()

router.get('/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')

  ]
  , validateRequest
  , async (req: Request, res: Response) => {


  })


export { router as signinRouter };

