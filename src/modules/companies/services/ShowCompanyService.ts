import AppError from "@shared/errors/AppError";
import Company from "../typeorm/entities/Company";
import { CompanyRepository } from "../typeorm/repositories/CompanyRepository";

interface IRequest {
    id: string;
}

export default class ShowCompanyService {
    public async execute({ id }: IRequest): Promise<Company> {
        const companyRepository = new CompanyRepository();

        const company = await companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company not found.", 404);
        }

        return company;
    }
}
