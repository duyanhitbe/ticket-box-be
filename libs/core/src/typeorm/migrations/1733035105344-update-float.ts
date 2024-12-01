import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class UpdateFloat1733035105344 implements MigrationInterface {
    name = 'UpdateFloat1733035105344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "rating_star" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "display_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "base_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "discount_value" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "discounted_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_base_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_discount_value" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_discounted_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "total_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "base_price" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "discount_value" TYPE double precision`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "discounted_price" TYPE double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "discounted_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "discount_value" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "base_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "total_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_discounted_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_discount_value" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "order_details" ALTER COLUMN "ticket_base_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "discounted_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "discount_value" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "base_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "total_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "display_price" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "rating_star" TYPE integer`);
    }

}
