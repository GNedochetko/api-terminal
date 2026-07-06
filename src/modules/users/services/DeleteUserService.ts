import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";

interface IRequest {
    id: string;
}

export default class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = AppDataSource.getRepository(User);

        const user = await usersRepository.findOneBy({ id });

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        await usersRepository.remove(user);
    }
}
