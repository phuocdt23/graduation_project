import mongoose from "mongoose";
import { app } from "./app";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
      .then(() => {
        console.log('connected to mongodb');
        app.listen(3000, () => {
          console.log('Auth listening on port 3000')
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