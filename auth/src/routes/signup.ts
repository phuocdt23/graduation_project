import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@phuoc.dt182724/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("phoneNumber").isMobilePhone('vi-VN').withMessage("phone number must be vietnamese phone number"),
    body("name").not().isNumeric().withMessage("Name is not a number"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("age")
      .isInt({ gt: 18 })
      .withMessage("Age must be greater than 18"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, phoneNumber } = req.body;
    const age = parseInt(req.body.age);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const existingNumber = await User.findOne({ phoneNumber });

    if (existingNumber) {
      throw new BadRequestError("Phone number in use");
    }

    const user = User.build({ name, age, phoneNumber, email, password });
    await user.save();

    // Generate JWT
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     age: user.age,
    //     phoneNumber: user.phoneNumber,
    //   },
    //   process.env.JWT_KEY!
    // );

    // // Store it on session object
    // req.session = {
    //   jwt: userJwt,
    // };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
