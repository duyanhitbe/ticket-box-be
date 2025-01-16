import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class AgencyLevel1737009340377 implements MigrationInterface {
    name = 'AgencyLevel1737009340377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agency_levels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_069916ae1e890a31cab81b7f91e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_UNIQUE_AgencyLevelTypeormEntity_level" ON "agency_levels" ("level") WHERE "deleted_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_UNIQUE_AgencyLevelTypeormEntity_level"`);
        await queryRunner.query(`DROP TABLE "agency_levels"`);
    }

}
