import { describe } from 'node:test';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as project from '../package.json';

describe('AppController', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('GET /', () => {
		it('should return data based on query and headers', async () => {
			const response = await request(app.getHttpServer()).get('/');

			expect(response.status).toBe(200);
			expect(response.text).toEqual(`${project.name} v${project.version}`);
		});
	});
});
