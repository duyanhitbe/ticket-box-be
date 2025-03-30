import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Order1743306410942 implements MigrationInterface {
    name = 'Order1743306410942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "agency_id" character varying`);
        const orders = await queryRunner.query('SELECT o.id, c.agency_id FROM orders o LEFT JOIN customers c ON c.id = o.customer_id')
        for (const order of orders) {
            const { id, agency_id } = order;
            if (!agency_id) continue;

            await queryRunner.query(`UPDATE orders SET agency_id = '${agency_id}' WHERE id = '${id}'`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "agency_id"`);
    }

}
