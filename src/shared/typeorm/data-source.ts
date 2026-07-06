import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Bus from "@modules/buses/typeorm/entities/Bus";
import User from "@modules/users/typeorm/entities/User";
import Company from "@modules/companies/typeorm/entities/Company";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", // se Node está fora do Docker
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "api-terminal",
    synchronize: false, // sempre false em produção/migrations
    logging: true,
    entities: [Bus, User, Company],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")], subscribers: [],
}); 
