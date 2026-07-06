import { Router } from "express";
import busesRouter from "@modules/buses/routes/buses.routes";
import companyRouter from "@modules/companies/routes/company.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";

const routes = Router();

routes.get('/', (request, response) => {
    response.json({ message: 'Hello Dev!' });
    return;
});

routes.use('/buses', busesRouter);
routes.use('/companies', companyRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
