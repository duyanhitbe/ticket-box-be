import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class AgencyEvent1737011282120 implements MigrationInterface {
    name = 'AgencyEvent1737011282120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agency_event" ("agency_id" uuid NOT NULL, "event_id" uuid NOT NULL, CONSTRAINT "PK_626cfe3e1966f09f942f2024525" PRIMARY KEY ("agency_id", "event_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa629381ff7a863c9e0f7dd762" ON "agency_event" ("agency_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_13dfd257a30387bba43fafeaec" ON "agency_event" ("event_id") `);
        await queryRunner.query(`ALTER TABLE "agency_event" ADD CONSTRAINT "FK_fa629381ff7a863c9e0f7dd7629" FOREIGN KEY ("agency_id") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "agency_event" ADD CONSTRAINT "FK_13dfd257a30387bba43fafeaec5" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency_event" DROP CONSTRAINT "FK_13dfd257a30387bba43fafeaec5"`);
        await queryRunner.query(`ALTER TABLE "agency_event" DROP CONSTRAINT "FK_fa629381ff7a863c9e0f7dd7629"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13dfd257a30387bba43fafeaec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa629381ff7a863c9e0f7dd762"`);
        await queryRunner.query(`DROP TABLE "agency_event"`);
    }

}
