import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from './../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Request, Response } from 'express';


const router = express.Router()

router.post('/api/users/signin',
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
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new BadRequestError('Password does not match');
    }

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    }

    return res.status(200).send({ user });
  })


export { router as signinRouter };

