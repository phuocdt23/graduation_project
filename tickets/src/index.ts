import { natsWapper } from './nats-wrapper';
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
    
    await natsWapper.connect('ticketing', 'randomstring', 'http://nats-srv:4222');
    natsWapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWapper.client.close());
    process.on('SIGTERM', () => natsWapper.client.close());
    
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('connected to mongodb');
        app.listen(3000, () => {
          console.log('Tickets listening on port 3000')
        })
      })
      .catch((err) => {
        throw new DatabaseConnectionError();
      });

  } catch (error) {
    console.log(error);
  }
}
start();