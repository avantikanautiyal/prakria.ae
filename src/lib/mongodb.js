import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}


async function dbConnect() {
  try {
    //  ADD you pre run code here 
    await mongoose.connect(MONGODB_URI);
    console.log("DataBase connected");

  } catch (err) {
    console.error((err).message);
    process.exit(1);
  }
}

export default dbConnect;
