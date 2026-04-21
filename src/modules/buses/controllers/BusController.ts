import { Request, Response, NextFunction } from "express";
import CreateBusService from "../services/CreateBusService";
import ListBusService from "../services/ListBusService";
import DeleteBusService from "../services/DeleteBusService";
import ShowBusService from "../services/ShowBusService";
import UpdateBusService from "../services/UpdateBusService";

export default class BusController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listBusService = new ListBusService();

            const buses = await listBusService.execute();

            return response.status(200).json(buses);
        } catch (error) {
            next(error);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;

            const showBusService = new ShowBusService();

            const bus = await showBusService.execute({ id });

            return response.status(200).json(bus);
        } catch (error) {
            next(error);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { plate, model, brand, year, passenger_capacity, current_mileage, last_maintenance_date } = request.body;

            const createBusService = new CreateBusService();

            const bus = await createBusService.execute({
                plate,
                model,
                brand,
                year,
                passenger_capacity,
                current_mileage,
                last_maintenance_date
            });

            return response.status(201).json(bus);
        } catch (error) {
            next(error);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { plate, model, brand, year, passenger_capacity, current_mileage, last_maintenance_date } = request.body;

            const updateBusService = new UpdateBusService();

            const bus = await updateBusService.execute({
                id,
                plate,
                model,
                brand,
                year,
                passenger_capacity,
                current_mileage,
                last_maintenance_date
            });

            return response.status(200).json(bus);
        } catch (error) {
            next(error);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;

            const deleteBusService = new DeleteBusService();

            await deleteBusService.execute({ id });

            return response.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
