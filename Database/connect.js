import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect(process.env.NEXT_PUBLIC_MongoDB_URI);
    console.log("Successfully connected to the database");
    return { success: true };
  } catch (error) {
    console.error("Error connecting to the database", error);
    return { success: false, error };
  }
}
export default connectDB;
