import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Bus from "../typeorm/entities/Bus";

interface IRequest {
  plate: string;
  model: string;
  brand: string;
  year: number;
  passenger_capacity: number;
  current_mileage: number;
  last_maintenance_date: Date;
}

export default class CreateBusService {
    public async execute({plate, model, brand, year, passenger_capacity, current_mileage, last_maintenance_date}: IRequest): Promise<Bus> {
        const busRepository = AppDataSource.getRepository(Bus);

        const busExists = await busRepository.findOne({ where: { plate } });

        if (busExists) {
            throw new AppError("Bus with this plate already exists.", 400);
        }

        const bus = busRepository.create({
            plate,
            model,
            brand,
            year,
            passenger_capacity,
            current_mileage,
            last_maintenance_date
        });

        await busRepository.save(bus);

        return bus;
    }
}