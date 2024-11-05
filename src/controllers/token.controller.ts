import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/user.interface";

class TokenController {
    async generateToken(req: Request, res: Response): Promise<any> {
        const { userName }: IUser = req.body;

        try {

            const token = jwt.sign({ userName }, process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return res.json({ token });
        } catch (error) {
            throw new Error(error as string)
        }

    }
}

export default TokenController;