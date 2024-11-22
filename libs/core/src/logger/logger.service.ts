import { ConsoleLogger } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
	private readonly ignoreContexts = [
		'InstanceLoader',
		'RouterExplorer',
		'RoutesResolver',
		'NestFactory'
	];

	log(message: any, context?: string): void {
		if (!context) {
			context = this.context || '';
		}
		if (this.ignoreContexts.includes(context)) {
			return;
		}
		if (typeof message === 'object') {
			message = `\n${JSON.stringify(message, null, 2)}`;
		}
		super.log(message, context);
	}

	debug(message: any, context?: string): void {
		if (!context) {
			context = this.context;
		}
		if (process.env.IS_DEBUG === 'false') return;
		if (typeof message === 'object') {
			if (context === 'Incoming Request') {
				message = `${JSON.stringify(message)}`;
			} else {
				message = `\n${JSON.stringify(message, null, 2)}`;
			}
		}
		super.debug(message, context);
	}
}
