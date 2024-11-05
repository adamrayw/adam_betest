import mongoose from "mongoose";
import IUser from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    emailAddress: { type: String, required: true },
    identifyNumber: { type: Number, required: true }
},
{
    timestamps: true
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;