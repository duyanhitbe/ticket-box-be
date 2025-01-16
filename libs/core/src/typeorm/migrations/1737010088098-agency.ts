import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Agency1737010088098 implements MigrationInterface {
    name = 'Agency1737010088098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, "phone" character varying, "address" character varying, "agency_level_id" uuid NOT NULL, CONSTRAINT "PK_8ab1f1f53f56c8255b0d7e68b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agencies" ADD CONSTRAINT "FK_a4cf6d99b5ed196aacadba2d0ca" FOREIGN KEY ("agency_level_id") REFERENCES "agency_levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agencies" DROP CONSTRAINT "FK_a4cf6d99b5ed196aacadba2d0ca"`);
        await queryRunner.query(`DROP TABLE "agencies"`);
    }

}
