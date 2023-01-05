import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, currentUser } from "@phuoc.dt182724/common";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.patch(
  "/api/users/changePassword",
  currentUser,
  requireAuth,
  [
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("newPassword")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { newPassword, password } = req.body;
    const user = await User.findOne({ email: req.currentUser!.email });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const passwordsMatch = await Password.compare(
      user.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid current password");
    }

    const isEqual = await Password.compare(
      user.password,
      newPassword
    );
    if (isEqual) {
      throw new BadRequestError("The new password equals the old one");
    }

    user.password = newPassword;

    await user.save();

    res.status(200).send(user);
  }
);

export { router as changePassword };
