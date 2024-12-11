import mongoose from 'mongoose';

async function connect(){
    const username = process.env.MONGO_DB_USERNAME
    const password = process.env.MONGO_DB_PASSWORD
    const url = process.env.MONGO_DB_URL


    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`)
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
}

export default connect;