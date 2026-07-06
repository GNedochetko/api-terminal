import { NextFunction, Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            const service = new ListUserService();
            const users = await service.execute();

            return res.json(users);
        } catch (err) {
            next(err);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const service = new CreateUserService();
            const user = await service.execute({ name, email, password });

            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const service = new DeleteUserService();

            await service.execute({ id });

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
