import { MigrationInterface, QueryRunner } from 'typeorm';
import { NewsTypeormEntity } from '@lib/modules/news';

//prettier-ignore
export class GeneratePrivacy1742445807997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const newsRepository = queryRunner.connection.getRepository(NewsTypeormEntity);

        await newsRepository.create({
            title: 'Chính sách bảo mật',
            content: '',
            order: 1,
            thumbnail: '',
            slug: 'privacy'
        }).save();
        await newsRepository.create({
            title: 'Điều khoản & Quy định',
            content: '',
            order: 2,
            thumbnail: '',
            slug: 'terms'
        }).save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const newsRepository = queryRunner.connection.getRepository(NewsTypeormEntity);
        await newsRepository.delete({ slug: 'privacy' });
        await newsRepository.delete({ slug: 'terms' });
    }

}
