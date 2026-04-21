import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Bus from "../typeorm/entities/Bus";

interface IRequest {
  id: string;
}

export default class ShowBusService {
    public async execute({ id }: IRequest): Promise<Bus> {
        const busRepository = AppDataSource.getRepository(Bus);

        const bus = await busRepository.findOneBy({ id });

        if (!bus) {
            throw new AppError("Bus not found.", 404);
        }

        return bus;
    }
}