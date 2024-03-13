import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    senha: { type: String, required: true},
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;