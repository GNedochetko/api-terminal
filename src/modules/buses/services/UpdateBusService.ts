import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Company from "@modules/companies/typeorm/entities/Company";
import Bus from "../typeorm/entities/Bus";

interface IRequest {
    id: string;
    plate: string;
    model: string;
    brand: string;
    year: number;
    passenger_capacity: number;
    current_mileage: number;
    last_maintenance_date: Date;
    company_id: string;
}

export default class UpdateBusService {
    public async execute({ id, plate, model, brand, year, passenger_capacity, current_mileage, last_maintenance_date, company_id }: IRequest): Promise<Bus> {
        const busRepository = AppDataSource.getRepository(Bus);
        const companyRepository = AppDataSource.getRepository(Company);

        const bus = await busRepository.findOneBy({ id });

        if (!bus) {
            throw new AppError("Bus not found.", 404);
        }

        const company = await companyRepository.findOneBy({ id: company_id });

        if (!company) {
            throw new AppError("Company not found.", 404);
        }

        bus.plate = plate;
        bus.model = model;
        bus.brand = brand;
        bus.year = year;
        bus.passenger_capacity = passenger_capacity;
        bus.current_mileage = current_mileage;
        bus.last_maintenance_date = last_maintenance_date;
        bus.company_id = company_id;

        await busRepository.save(bus);

        return bus;
    }
}
