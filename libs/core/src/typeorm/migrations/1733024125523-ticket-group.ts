import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class TicketGroup1733024125523 implements MigrationInterface {
    name = 'TicketGroup1733024125523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD "date_type" "public"."ENUM_DATE_TYPE" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD "dates" jsonb`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD "from_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD "to_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP COLUMN "to_date"`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP COLUMN "dates"`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP COLUMN "date_type"`);
    }

}
