import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/typeorm/data-source';
import Company from '../entities/Company';

export class CompanyRepository {
    private ormRepository: Repository<Company>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Company);
    }

    public async findAll(): Promise<Company[]> {
        return this.ormRepository.find();
    }

    public async findById(id: string): Promise<Company | null> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async findByName(name: string): Promise<Company | null> {
        return this.ormRepository.findOne({ where: { name } });
    }

    public async findByCnpj(cnpj: string): Promise<Company | null> {
        return this.ormRepository.findOne({ where: { cnpj } });
    }

    public async findByEmail(email: string): Promise<Company | null> {
        return this.ormRepository.findOne({ where: { email } });
    }

    public async createCompany(companyData: Partial<Company>): Promise<Company> {
        const company = this.ormRepository.create(companyData);

        await this.ormRepository.save(company);

        return company;
    }

    public async save(company: Company): Promise<Company> {
        return this.ormRepository.save(company);
    }

    public async remove(company: Company): Promise<Company> {
        return this.ormRepository.remove(company);
    }
}
