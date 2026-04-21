import { Router } from "express";
import busesRouter from "@modules/buses/routes/buses.routes";

const routes = Router();

routes.get('/', (request, response) => {
    response.json({ message: 'Hello Dev!' });
    return;
});

routes.use('/buses', busesRouter);

export default routes;
