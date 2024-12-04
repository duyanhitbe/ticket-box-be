import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class Customer1733303509465 implements MigrationInterface {
    name = 'Customer1733303509465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_UNIQUE_CustomerTypeormEntity_phone" ON "customers" ("phone") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_UNIQUE_CustomerTypeormEntity_phone"`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" SET NOT NULL`);
    }

}
