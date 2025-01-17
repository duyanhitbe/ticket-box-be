import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class TicketPrice1737083514886 implements MigrationInterface {
    name = 'TicketPrice1737083514886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "tickets"`);
        await queryRunner.query(`DELETE FROM "ticket_prices"`);
        await queryRunner.query(`DELETE FROM "ticket_infos"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_6fbbed3091c5cfc611ce35914e1"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "IDX_UNIQUE_TicketPriceTypeormEntity_ticket_info_id_customer_rol"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" RENAME COLUMN "customer_role_id" TO "agency_level_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "IDX_UNIQUE_TicketPriceTypeormEntity_ticket_info_id_agency_level_id" UNIQUE ("ticket_info_id", "agency_level_id")`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_60a30fcc448b0a99a68a81c08c5" FOREIGN KEY ("agency_level_id") REFERENCES "agency_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "tickets"`);
        await queryRunner.query(`DELETE FROM "ticket_prices"`);
        await queryRunner.query(`DELETE FROM "ticket_infos"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_60a30fcc448b0a99a68a81c08c5"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "IDX_UNIQUE_TicketPriceTypeormEntity_ticket_info_id_agency_level_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" RENAME COLUMN "agency_level_id" TO "customer_role_id"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "IDX_UNIQUE_TicketPriceTypeormEntity_ticket_info_id_customer_rol" UNIQUE ("customer_role_id", "ticket_info_id")`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_6fbbed3091c5cfc611ce35914e1" FOREIGN KEY ("customer_role_id") REFERENCES "customer_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
