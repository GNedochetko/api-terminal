import AppError from "@shared/errors/AppError";
import Company from "../typeorm/entities/Company";
import { CompanyRepository } from "../typeorm/repositories/CompanyRepository";

interface IRequest {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

export default class CreateCompanyService {
    public async execute({ name, cnpj, email, phone, address, city }: IRequest): Promise<Company> {
        const companyRepository = new CompanyRepository();

        const companyExists = await companyRepository.findByCnpj(cnpj);

        if (companyExists) {
            throw new AppError("Company with this CNPJ already exists.", 400);
        }

        const company = await companyRepository.createCompany({
            name,
            cnpj,
            email,
            phone,
            address,
            city,
        });

        return company;
    }
}
