import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class RenameTable1733111751522 implements MigrationInterface {
    name = 'RenameTable1733111751522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket-group-dates" RENAME TO ticket_group_dates`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ticket_group_dates RENAME TO "ticket-group-dates"`);
    }

}
