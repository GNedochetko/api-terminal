import Company from '../typeorm/entities/Company';
import { CompanyRepository } from '../typeorm/repositories/CompanyRepository';

export default class ListCompanyService {
    public async execute(): Promise<Company[]> {
        const companyRepository = new CompanyRepository();

        return companyRepository.findAll();
    }
}
