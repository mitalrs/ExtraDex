import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type:String, required:['first name field required']},
    lastName: {type:String, required:['last name field required']},
    email: {type:String, required:['email field required']},
    password: {type:String, required:['password field required']},
    categories: [{ label: String, icon: String }]
}, {timestamps: true});


export default new mongoose.model('User', UserSchema);