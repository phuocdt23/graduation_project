import express from "express";
import { currentUser } from "@phuoc.dt182724/common";
import { User } from "../models/user";
const router = express.Router();

router.get("/api/users/info", currentUser, async (req, res) => {
  try {
    const user = await User.findById(req.currentUser!.id);
    res.send({ currentUser: user || null });
  } catch (error) {
    console.error(error);
    throw error;
  }

});

export { router as infoRouter };
