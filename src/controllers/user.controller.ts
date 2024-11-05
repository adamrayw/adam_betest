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

            const existingUser = await this.userService.checkIfDataExist(data);

            if (existingUser) {
                return res.status(400).json({
                    message: "One of the fields already exists."
                });
            }

            const user = await this.userService.create(data);

            res.status(201).json({
                message: "New user created succcessfully!",
                data: user
            });
        } catch (error: unknown) {
            throw new Error(error as string);
        }
    }

    async findAll(req: Request, res: Response) {
        const { accountNumber, identifyNumber } = req.query

        try {
            let users;

            if (typeof accountNumber === 'string' && accountNumber !== "") {
                users = await this.userService.findByAccountNumber(accountNumber)
            } else if (typeof identifyNumber === 'string' && identifyNumber !== "") {
                users = await this.userService.findByIdentifyNumber(identifyNumber)
            } else {
                users = await this.userService.findAll();
            }

            const producer = this.kafkaClient.kafka

            await producer.send({
                topic: "kafka_adam_betest",
                messages: [{
                    value: JSON.stringify(users)
                }]
            })

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
            if (error.code === 11000) {
                // Handle duplicate key error
                return res.status(400).json({
                    message: "One of the fields already exists.",
                });
            }
    
            res.status(500).json({
                message: "Failed to update user",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}

export default UserController;