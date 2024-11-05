import { NextFunction, Request, Response } from "express";
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

    async create(req: Request, res: Response, next: NextFunction) {
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
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
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

            const producer = this.kafkaClient.kafkaProducer

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
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        try {
            const user = await this.userService.findById(id)
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        try {
            const user = await this.userService.delete(id);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User deleted successfully!"
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const data: IUser = req.body;
        const id: string = req.params.id

        try {
            const user = await this.userService.update(id, data);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User updated successfully!",
                data: user
            })

        } catch (error) {
            if ((error as any).code === 11000) {
                return res.status(400).json({ message: "One of the fields already exists." });
            }
            next(error);
        }
    }
}

export default UserController;