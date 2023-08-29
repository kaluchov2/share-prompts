import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGOODB_URI, {
            dbName: "PromptProject",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;

    } catch (error) {
        console.log(error);
    }
}