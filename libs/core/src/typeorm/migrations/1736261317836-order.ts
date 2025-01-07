import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Order1736261317836 implements MigrationInterface {
    name = 'Order1736261317836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "card_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "card_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "card_name" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "card_id" character varying`);
    }

}
