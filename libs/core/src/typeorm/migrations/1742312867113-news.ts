import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class News1742312867113 implements MigrationInterface {
    name = 'News1742312867113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "title" character varying NOT NULL, "thumbnail" character varying NOT NULL, "content" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
