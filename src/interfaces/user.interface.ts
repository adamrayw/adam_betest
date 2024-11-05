import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    id: string,
    userName: string,
    accountNumber: number,
    emailAddress: string,
    identityNumber: number
}

export default IUser;