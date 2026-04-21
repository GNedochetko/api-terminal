import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Bus from "@modules/buses/typeorm/entities/Bus";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", // se Node está fora do Docker
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "api-terminal",
    synchronize: false, // sempre false em produção/migrations
    logging: true,
    entities: [Bus],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")], subscribers: [],
}); 