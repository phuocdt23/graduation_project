import { natsWrapper } from './nats-wrapper';
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
    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL);
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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