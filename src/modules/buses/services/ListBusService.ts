import { AppDataSource } from "@shared/typeorm/data-source";
import Bus from "../typeorm/entities/Bus";

export default class ListBusService {
    public async execute(): Promise<Bus[]> {
        const busRepository = AppDataSource.getRepository(Bus);

        return await busRepository.find();
    }
}