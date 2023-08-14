import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

// detect uncaught
process.on('uncaughtException', error => {
  console.log(error);

  process.exit(1);
});

// init server
let server: Server;

// database connection
async function ConnectDatabase() {
  try {
    // await mongoose.connect(config.database_url as string);
    await mongoose.connect('mongodb://127.0.0.1:27017/book-store' as string);

    server = app.listen(config.port, () => {
      console.log(`Book store app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect Database');
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  // close server on unhandled error
  process.on('unhandledRejection', error => {
    // if server is running then close it first
    console.log(error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

ConnectDatabase();

// sigterm received
process.on('SIGTERM', () => {
  console.log('Sigterm is received');
  if (server) {
    server.close();
  }
});
