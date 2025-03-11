/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class Event1741667682941 implements MigrationInterface {
    name = 'Event1741667682941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "images" text DEFAULT '' NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "image" SET NOT NULL`);
    }

}
