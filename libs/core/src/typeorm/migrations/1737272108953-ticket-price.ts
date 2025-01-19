import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class TicketPrice1737272108953 implements MigrationInterface {
    name = 'TicketPrice1737272108953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "tickets"`);
        await queryRunner.query(`DELETE FROM "ticket_prices"`);
        await queryRunner.query(`DELETE FROM "ticket_infos"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "agency_level_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "tickets"`);
        await queryRunner.query(`DELETE FROM "ticket_prices"`);
        await queryRunner.query(`DELETE FROM "ticket_infos"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ALTER COLUMN "agency_level_id" SET NOT NULL`);
    }

}
