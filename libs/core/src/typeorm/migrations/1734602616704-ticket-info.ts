import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class TicketInfo1734602616704 implements MigrationInterface {
    name = 'TicketInfo1734602616704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_infos" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" ADD "order" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_infos" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" DROP COLUMN "code"`);
    }

}
