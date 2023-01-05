import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@phuoc.dt182724/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/update",
  [
    body("phoneNumber").isString().withMessage("Phone number must be valid"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("age")
      .isInt({ gt: 0 })
      .withMessage("Age must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, age, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ name, age, phoneNumber, email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
