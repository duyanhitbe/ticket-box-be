import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Customer1737016245208 implements MigrationInterface {
    name = 'Customer1737016245208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "agency_level_id" uuid`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "agency_id" uuid`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "is_agency" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_eba2ae30fa664898e5d0c586167" FOREIGN KEY ("agency_level_id") REFERENCES "agency_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_4794cf517bc19743bf9c8599891" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_4794cf517bc19743bf9c8599891"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_eba2ae30fa664898e5d0c586167"`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "allow_debt_purchase" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "is_agency"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "agency_id"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "agency_level_id"`);
    }

}
