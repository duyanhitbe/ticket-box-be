import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class OrderDetail1733403998536 implements MigrationInterface {
    name = 'OrderDetail1733403998536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_553c4e818ba603e32a99371079b"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP COLUMN "ticket_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" ADD "ticket_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_553c4e818ba603e32a99371079b" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
