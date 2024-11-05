import IUser from "../interfaces/user.interface";
import UserRepository from "../repository/user.repository";

class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: IUser): Promise<IUser> {
        return this.userRepository.create(data);
    }

    async findAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    async findById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    }

    async update(id: string, data: IUser): Promise<IUser | null> {
        return this.userRepository.update(id, data);
    }

    async delete(id: string): Promise<IUser | null> {
        return this.userRepository.delete(id);
    }

    async findByAccountNumber(accountNumber: string): Promise<IUser | null> {
        return this.userRepository.findByAccountNumber(accountNumber);
    }

    async findByIdentityNumber(identityNumber: string): Promise<IUser | null> {
        return this.userRepository.findByIdentityNumber(identityNumber);
    }
    
    async checkIfDataExist(data: IUser): Promise<IUser | null> {
        return this.userRepository.checkIfUserExist(data)
    }
}

export default UserService;
