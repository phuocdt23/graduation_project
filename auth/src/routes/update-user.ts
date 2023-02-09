import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, currentUser } from "@phuoc.dt182724/common";

import { User } from "../models/user";

const router = express.Router();

router.patch(
  "/api/users/update",
  currentUser,
  requireAuth,
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
    console.log(name, age, phoneNumber);
    const user = await User.findOne({ email: req.currentUser!.email });

    if (!user) {
      throw new BadRequestError("User not found");
    }
    const existingNumber = await User.findOne({ phoneNumber });

    if (existingNumber) {
      throw new BadRequestError("Phone number in use");
    }
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.age = age;

    await user.save();

    res.status(200).send(user);
  }
);

export { router as updateUserRouter };
