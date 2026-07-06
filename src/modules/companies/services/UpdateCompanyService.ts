import AppError from "@shared/errors/AppError";
import Company from "../typeorm/entities/Company";
import { CompanyRepository } from "../typeorm/repositories/CompanyRepository";

interface IRequest {
    id: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

export default class UpdateCompanyService {
    public async execute({ id, name, cnpj, email, phone, address, city }: IRequest): Promise<Company> {
        const companyRepository = new CompanyRepository();

        const company = await companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company not found.", 404);
        }

        if (company.cnpj !== cnpj) {
            const companyWithSameCnpj = await companyRepository.findByCnpj(cnpj);

            if (companyWithSameCnpj) {
                throw new AppError("Company with this CNPJ already exists.", 400);
            }
        }

        company.name = name;
        company.cnpj = cnpj;
        company.email = email;
        company.phone = phone;
        company.address = address;
        company.city = city;

        await companyRepository.save(company);

        return company;
    }
}
