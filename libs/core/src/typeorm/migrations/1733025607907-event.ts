import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class Event1733025607907 implements MigrationInterface {
    name = 'Event1733025607907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "date_type"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "dates"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "from_date"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "to_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "to_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "events" ADD "from_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "events" ADD "dates" jsonb`);
        await queryRunner.query(`ALTER TABLE "events" ADD "date_type" "public"."ENUM_DATE_TYPE" NOT NULL`);
    }

}
