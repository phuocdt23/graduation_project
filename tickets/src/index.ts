import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "@phuoc.dt182724/common";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }

    await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('connected to mongodb');
        app.listen(3000, () => {
          console.log('Tickets listening on port 3000')
        })
      })
      .catch((err) => {
        console.log(err)
        throw new DatabaseConnectionError();
      });
  } catch (error) {
    console.log(error);
  }
}
start();