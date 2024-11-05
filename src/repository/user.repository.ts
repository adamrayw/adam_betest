import IUser from "../interfaces/user.interface";
import User from "../models/user.model";
import GenericRepository from "./generic.repository";

class UserRepository extends GenericRepository<IUser> {
    constructor() {
        super(User)
    }

    async findByAccountNumber(accountNumber: string): Promise<IUser | null> {
        return User.findOne({
            accountNumber
        });
    }

    async findByIdentityNumber(identityNumber: string): Promise<IUser | null> {
        return User.findOne({
            identityNumber
        })
    }

    async checkIfUserExist(data: IUser): Promise<IUser | null> {
        return User.findOne({
            $or: [
                {userName: data.userName},
                {accountNumber: data.accountNumber},
                {identityNumber: data.identityNumber},
                {emailAddress: data.emailAddress}
            ]
        })
    }
}

export default UserRepository;