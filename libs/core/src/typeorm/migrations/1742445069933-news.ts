import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class News1742445069933 implements MigrationInterface {
    name = 'News1742445069933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "slug"`);
    }

}
