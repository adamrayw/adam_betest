import { Router } from "express";
import UserController from "../controllers/user.controller";
import ProtectRouteMiddleware from "../middleware/protectRoute.middleware";

class UserRoute {
    private readonly userController: UserController;
    private readonly protectRouteMiddleware: ProtectRouteMiddleware;
    public readonly router: Router;

    constructor() {
        this.userController = new UserController();
        this.protectRouteMiddleware = new ProtectRouteMiddleware();
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post("/create", this.protectRouteMiddleware.verifyToken.bind(this.protectRouteMiddleware), this.userController.create.bind(this.userController));
        this.router.get("/", this.protectRouteMiddleware.verifyToken.bind(this.protectRouteMiddleware), this.userController.findAll.bind(this.userController));
        this.router.get("/details/:id", this.protectRouteMiddleware.verifyToken.bind(this.protectRouteMiddleware), this.userController.findById.bind(this.userController))
        this.router.delete("/delete/:id", this.protectRouteMiddleware.verifyToken.bind(this.protectRouteMiddleware), this.userController.delete.bind(this.userController))
        this.router.put("/update/:id", this.protectRouteMiddleware.verifyToken.bind(this.protectRouteMiddleware), this.userController.update.bind(this.userController))
    }
}

export default new UserRoute().router;