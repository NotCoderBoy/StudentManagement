import mongoose from "mongoose";

let client = null;

const MONGOB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (client) {
    return { client };
  }

  await mongoose.connect(MONGOB_URI);

  client = mongoose.connection;

  console.log("Connected to the Database");
  return { client };
}

export default connectToDb;
