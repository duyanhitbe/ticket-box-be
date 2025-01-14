import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Ticket1736862495029 implements MigrationInterface {
    name = 'Ticket1736862495029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "IDX_UNIQUE_TicketTypeormEntity_event_id_code" UNIQUE ("event_id", "code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "IDX_UNIQUE_TicketTypeormEntity_event_id_code"`);
    }

}
