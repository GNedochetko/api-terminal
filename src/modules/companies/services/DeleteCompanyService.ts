import AppError from "@shared/errors/AppError";
import { CompanyRepository } from "../typeorm/repositories/CompanyRepository";

interface IRequest {
    id: string;
}

export default class DeleteCompanyService {
    public async execute({ id }: IRequest): Promise<void> {
        const companyRepository = new CompanyRepository();

        const company = await companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company not found.", 404);
        }

        await companyRepository.remove(company);
    }
}
