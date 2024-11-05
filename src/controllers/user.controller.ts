import { Request, Response } from "express";
import IUser from "../interfaces/user.interface"; 
import KafkaClient from "../config/kafka";
import UserService from "../services/user.service";

class UserController {
    private readonly userService: UserService;
    private readonly kafkaClient: KafkaClient;

    constructor() {
        this.userService = new UserService();
        this.kafkaClient = new KafkaClient();
    }   

    async create(req: Request, res: Response) {
        try {
            const data: IUser = req.body;
            const user = await this.userService.create(data);

            const producer = this.kafkaClient.kafka;

            await producer.send({
                topic: "kafka_adam_betest",
                messages: [{
                    value: JSON.stringify(user)
                }]
            })

            res.status(201).json({
                message: "New user created succcessfully!",
                data: user
            });
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            res.status(200).json({
                message: "Success get all users!",
                data: users
            });
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findById(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const user = await this.userService.findById(id)
            res.status(200).json(user);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async delete(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const user = await this.userService.delete(id);
            res.status(200).json({
                message: "User deleted successfully!"
            });
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async update(req: Request, res: Response) {
        const data: IUser = req.body;
        const id: string = req.params.id

        try {
            const user = await this.userService.update(id, data);

            res.status(200).json({
                message: "User updated successfully!",
                data: user
            })

        } catch (error) {
            throw new Error(error as string)
        }   
    }
}

export default UserController;