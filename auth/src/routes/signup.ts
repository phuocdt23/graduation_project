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
      return res.status(400).send(errors.array())
    }
    const { email, password } = req.body;
    console.log('email: ', email);
    console.log('password: ', password);

    console.log('Creating a user...');
    res.status(200).send({ email, password })

  })


export { router as signupRouter };

