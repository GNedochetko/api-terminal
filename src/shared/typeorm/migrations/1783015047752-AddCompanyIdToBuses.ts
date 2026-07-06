import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyIdToBuses1783015047752 implements MigrationInterface {
    name = 'AddCompanyIdToBuses1783015047752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buses" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "buses" ADD CONSTRAINT "FK_a9cd6731c6743aa554ad0e3912b" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buses" DROP CONSTRAINT "FK_a9cd6731c6743aa554ad0e3912b"`);
        await queryRunner.query(`ALTER TABLE "buses" DROP COLUMN "company_id"`);
    }

}
