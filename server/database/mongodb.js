import mongoose from 'mongoose';

async function connect(){

await mongoose.connect("mongodb+srv://mital:Mitalmital@cluster0.uqsmrq1.mongodb.net/?retryWrites=true&w=majority")
 console.log('MongoDB connection is successful');

}

export default connect;
