import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    id: string,
    userName: string,
    accountNumber: number,
    emailAddress: string,
    identifyNumber: number
}

export default IUser;