import { Request, Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import CompanyController from "../controllers/CompanyController";

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.use(isAuthenticated);

companyRouter.get('/', async (request, response, next) => {
    try {
        await companyController.index(request, response, next);
    } catch (error) {
        next(error);
    }
});

companyRouter.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}), async (request, response, next) => {
    try {
        await companyController.show(request, response, next);
    } catch (error) {
        next(error);
    }
});

companyRouter.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required()
    })
}), async (request, response, next) => {
    try {
        await companyController.create(request, response, next);
    } catch (error) {
        next(error);
    }
});

companyRouter.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required()
    })
}), async (request: Request<{ id: string }>, response, next) => {
    try {
        await companyController.update(request, response, next);
    } catch (error) {
        next(error);
    }
});

companyRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    })
}), async (request: Request<{ id: string }>, response, next) => {
    try {
        await companyController.delete(request, response, next);
    } catch (error) {
        next(error);
    }
});

export default companyRouter;
