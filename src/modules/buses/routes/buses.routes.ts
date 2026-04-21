import { Request, Router } from "express";
import BusController from "../controllers/BusController";
import { celebrate, Joi, Segments } from 'celebrate';

const busesRouter = Router();
const busController = new BusController();

busesRouter.get('/', async (request, response, next) => {
    try {
        await busController.index(request, response, next);
    } catch (error) {
        next(error);
    }
});

busesRouter.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}), async (request, response, next) => {
    try {
        await busController.show(request, response, next);
    } catch (error) {
        next(error);
    }
});

busesRouter.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        plate: Joi.string().required(),
        model: Joi.string().required(),
        brand: Joi.string().required(),
        year: Joi.number().integer().required(),
        passenger_capacity: Joi.number().integer().required(),
        current_mileage: Joi.number().required(),
        last_maintenance_date: Joi.date().required()
    })
}), async (request, response, next) => {
    try {
        await busController.create(request, response, next);
    } catch (error) {
        next(error);
    }
});

busesRouter.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        plate: Joi.string(),
        model: Joi.string(),
        brand: Joi.string(),
        year: Joi.number().integer(),
        passenger_capacity: Joi.number().integer(),
        current_mileage: Joi.number(),
        last_maintenance_date: Joi.date()
    })
}), async (request: Request<{ id: string }>, response, next) => {
    try {
        await busController.update(request, response, next);
    } catch (error) {
        next(error);
    }
});

busesRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}), async (request: Request<{ id: string }>, response, next) => {
    try {
        await busController.delete(request, response, next);
    } catch (error) {
        next(error);
    }
});

export default busesRouter;
