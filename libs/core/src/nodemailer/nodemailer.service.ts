import { Injectable, Logger } from '@nestjs/common';
import { NodemailerService } from './nodemailer.abstract';
import { InjectNodemailer } from './nodemailer.decorator';
import { SendMailOptions, Transporter } from 'nodemailer';
import { SendMailOrderOptions } from './nodemailer.interface';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { toVND } from '@lib/common/helpers';

@Injectable()
export class NodemailerServiceImp extends NodemailerService {
	private readonly logger = new Logger(this.constructor.name);

	constructor(@InjectNodemailer() private readonly transporter: Transporter) {
		super();
	}

	private async send(options: SendMailOptions) {
		try {
			await this.transporter.sendMail(options);
		} catch (error) {
			this.logger.error(error);
		}
	}

	private loadTemplate(name: string, data?: any): string {
		const path = join(__dirname, '..', 'public', name + '.hbs');
		const templateFile = readFileSync(path, 'utf8');
		const template = handlebars.compile(templateFile);
		return template(data);
	}

	sendOrderSuccess(options: SendMailOrderOptions) {
		const from = '"No Reply" <noreply@yourdomain.com>';
		const subject = 'Đặt vé thành công';
		const html = this.loadTemplate('order-success', {
			...options,
			details: options.details.map((detail) => ({
				...detail,
				price: toVND(detail.price),
				totalPrice: toVND(detail.totalPrice)
			})),
			totalPrice: toVND(options.totalPrice)
		});
		return this.send({
			from,
			to: options.to,
			subject,
			html
		});
	}
}
