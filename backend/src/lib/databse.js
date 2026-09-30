import mongoose from "mongoose"

export async function dbConnect(){
    try {
       
        
        await mongoose.connect(process.env.DB_URI)
        console.log("db connect");
        
    } catch (error) {
        console.log("db not connect")
        console.log(error);
        
        
    }
}