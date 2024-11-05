import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class ProtectRouteMiddleware {
    public verifyToken(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({
                message: "Access denied."
            });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log(decoded)
            next();
        } catch (error) {
            res.status(400).json({ message: "Invalid token." });
        }
    }
}

export default ProtectRouteMiddleware;