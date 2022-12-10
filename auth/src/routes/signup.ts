import jwt from 'jsonwebtoken';
import { BadRequestError } from './../errors/bad-request-error';
import { RequestValidationError } from './../errors/request-validation-error';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

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
  ,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // console.log(JSON.stringify(errors))
    if (!errors.isEmpty()) {
      // console.log('errors.array(): ', errors.array())
      throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body;
    console.log('-----------------------------')
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('-----------------------------')
    console.log('Creating a user...');
    console.log('Check if existing user\n');
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError('Email already in use')
    }

    const newUser = User.build({ email, password });
    const result = await newUser.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: newUser.id,
      email: newUser.email
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    }

    return res.status(200).send({ result });


  })


export { router as signupRouter };

