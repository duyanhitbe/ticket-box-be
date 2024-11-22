import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import * as project from '../package.json';

@Controller({ version: VERSION_NEUTRAL })
@ApiExcludeController()
export class AppController {
	@Get()
	index(): string {
		return `${project.name} v${project.version}`;
	}
}
