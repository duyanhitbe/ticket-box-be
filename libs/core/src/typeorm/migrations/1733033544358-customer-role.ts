import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class CustomerRole1733033544358 implements MigrationInterface {
    name = 'CustomerRole1733033544358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_roles" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_UNIQUE_CustomerRoleTypeormEntity_code" ON "customer_roles" ("code") WHERE "deleted_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_UNIQUE_CustomerRoleTypeormEntity_code"`);
        await queryRunner.query(`ALTER TABLE "customer_roles" DROP COLUMN "code"`);
    }

}
