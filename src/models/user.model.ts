import mongoose from "mongoose";
import IUser from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    identityNumber: {
        type: Number,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    })

const User = mongoose.model<IUser>("User", userSchema);

export default User;