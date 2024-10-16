import mongoose from "mongoose";

const dbconnection=async()=>{
   try {
    
       const connection=await mongoose.connect(
           process.env.MONGODB_URL || "mongodb+srv://gautamchaudhary9101:RtJznPU10K0vH1ju@cluster0.t2fgm.mongodb.net/"
       )
   
       if (connection) {
        console.log(`MongoDB is connected: ${connection.connection.host}`);
       }
   } catch (error) {
    console.log('mongodb is not connected',error)
   }
}

export default dbconnection;
