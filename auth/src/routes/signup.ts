import jwt from 'jsonwebtoken';
import { BadRequestError } from './../errors/bad-request-error';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

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
  validateRequest,
  async (req: Request, res: Response) => {
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

    return res.status(201).send({ result });


  })


export { router as signupRouter };

