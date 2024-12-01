import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class TicketGroupDate1733060760460 implements MigrationInterface {
    name = 'TicketGroupDate1733060760460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket-group-dates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "event_id" uuid NOT NULL, "ticket_group_id" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_bdd5c13a3166267516cc7031cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP COLUMN "dates"`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ALTER COLUMN "from_date" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ALTER COLUMN "to_date" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "order_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "customer_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "use_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "expires_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket-group-dates" ADD CONSTRAINT "FK_1d8dd419799b038176c2eb1d4c5" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket-group-dates" ADD CONSTRAINT "FK_85fd1831d63530c5b80db4e5fa1" FOREIGN KEY ("ticket_group_id") REFERENCES "ticket_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "expires_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "use_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "customer_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "order_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ALTER COLUMN "to_date" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ALTER COLUMN "from_date" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD "dates" jsonb`);
        await queryRunner.query(`DROP TABLE "ticket-group-dates"`);
    }

}
