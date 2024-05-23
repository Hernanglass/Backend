import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
       await mongoose.connect('mongodb+srv://hernanglass:CoderCoder@cluster0.kssmwg4.mongodb.net/ecommerce');
       console.log('base de datos online')
    } catch (error) {
        console.log(`eror al levantar la base de datos ${error}`)
        process.exit(1);
    }
}