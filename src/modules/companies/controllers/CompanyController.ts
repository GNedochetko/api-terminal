import { Request, Response, NextFunction } from "express";
import CreateCompanyService from "../services/CreateCompanyService";
import DeleteCompanyService from "../services/DeleteCompanyService";
import ListCompanyService from "../services/ListCompanyService";
import ShowCompanyService from "../services/ShowCompanyService";
import UpdateCompanyService from "../services/UpdateCompanyService";

export default class CompanyController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listCompanyService = new ListCompanyService();

            const companies = await listCompanyService.execute();

            return response.status(200).json(companies);
        } catch (error) {
            next(error);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;

            const showCompanyService = new ShowCompanyService();

            const company = await showCompanyService.execute({ id });

            return response.status(200).json(company);
        } catch (error) {
            next(error);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, cnpj, email, phone, address, city } = request.body;

            const createCompanyService = new CreateCompanyService();

            const company = await createCompanyService.execute({
                name,
                cnpj,
                email,
                phone,
                address,
                city,
            });

            return response.status(201).json(company);
        } catch (error) {
            next(error);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { name, cnpj, email, phone, address, city } = request.body;

            const updateCompanyService = new UpdateCompanyService();

            const company = await updateCompanyService.execute({
                id,
                name,
                cnpj,
                email,
                phone,
                address,
                city,
            });

            return response.status(200).json(company);
        } catch (error) {
            next(error);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;

            const deleteCompanyService = new DeleteCompanyService();

            await deleteCompanyService.execute({ id });

            return response.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
