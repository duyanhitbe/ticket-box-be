import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class TicketInfo1733318791744 implements MigrationInterface {
    name = 'TicketInfo1733318791744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_infos" ALTER COLUMN "quantity" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_infos" ALTER COLUMN "quantity" DROP NOT NULL`);
    }

}
