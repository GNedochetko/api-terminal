import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1776781076378 implements MigrationInterface {
    name = 'CreateProducts1776781076378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying NOT NULL, "model" character varying NOT NULL, "brand" character varying NOT NULL, "year" integer NOT NULL, "passenger_capacity" integer NOT NULL, "current_mileage" integer NOT NULL, "last_maintenance_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ddebc0eeba64a019ae072975947" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "buses"`);
    }

}
