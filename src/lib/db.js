import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI;
let isConnected= false;
export async function connectDB(){
    if(isConnected) return;
    if(!MONGODB_URI)  throw new Error ("MOngo uri Not Present ");

    await mongoose.connect(MONGODB_URI);
     console.log("mongodb connected")
     isConnected = true;

}