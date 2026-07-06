import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Company from "@modules/companies/typeorm/entities/Company";
import Bus from "../typeorm/entities/Bus";

interface IRequest {
    plate: string;
    model: string;
    brand: string;
    year: number;
    passenger_capacity: number;
    current_mileage: number;
    last_maintenance_date: Date;
    company_id: string;
}

export default class CreateBusService {
    public async execute({ plate, model, brand, year, passenger_capacity, current_mileage, last_maintenance_date, company_id }: IRequest): Promise<Bus> {
        const busRepository = AppDataSource.getRepository(Bus);
        const companyRepository = AppDataSource.getRepository(Company);

        const busExists = await busRepository.findOne({ where: { plate } });

        if (busExists) {
            throw new AppError("Bus with this plate already exists.", 400);
        }

        const company = await companyRepository.findOneBy({ id: company_id });

        if (!company) {
            throw new AppError("Company not found.", 404);
        }

        const bus = busRepository.create({
            plate,
            model,
            brand,
            year,
            passenger_capacity,
            current_mileage,
            last_maintenance_date,
            company_id
        });

        await busRepository.save(bus);

        return bus;
    }
}
