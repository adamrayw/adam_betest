import { Router } from "express";
import TokenController from "../controllers/token.controller";

class TokenRoute {
    public readonly router: Router;
    private readonly tokenController: TokenController

    constructor() {
        this.router = Router();
        this.tokenController = new TokenController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/generate", this.tokenController.generateToken.bind(this.tokenController));
    }
} 

export default new TokenRoute().router;