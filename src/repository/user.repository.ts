import IUser from "../interfaces/user.interface";
import User from "../models/user.model";
import GenericRepository from "./generic.repository";

class UserRepository extends GenericRepository<IUser> {
    constructor() {
        super(User)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({
            emailAddress: email
        });
    }

    async findByName(name: string): Promise<IUser | null> {
        return User.findOne({
            userName: name
        })
    }
}

export default UserRepository;