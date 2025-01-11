import { Injectable, Logger } from '@nestjs/common';
import { NodemailerService } from './nodemailer.abstract';
import { InjectNodemailer } from './nodemailer.decorator';
import { SendMailOptions, Transporter } from 'nodemailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { toVND } from '@lib/common/helpers';
import { SendMailOrderEventPayload } from '@lib/modules/mail';
import { ENUM_ORDER_STATUS } from '@lib/modules/order';

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

	sendMailOrder(options: SendMailOrderEventPayload) {
		const { orderStatus, details, totalPrice, customerEmail } = options;
		const subjectMap = {
			[ENUM_ORDER_STATUS.RESERVED]: 'Đặt vé thành công',
			[ENUM_ORDER_STATUS.PAID]: 'Xác nhận thanh toán',
			[ENUM_ORDER_STATUS.CANCELLED]: 'Xác nhận huỷ vé'
		};

		const from = '"No Reply" <noreply@yourdomain.com>';
		const subject = subjectMap[orderStatus];
		const template = `order-${orderStatus.toLowerCase()}`;
		const data = {
			...options,
			details: details?.map((detail) => ({
				...detail,
				price: toVND(detail.price),
				totalPrice: toVND(detail.totalPrice)
			})),
			totalPrice: toVND(totalPrice || 0)
		};
		const html = this.loadTemplate(template, data);

		return this.send({
			from,
			to: customerEmail,
			subject,
			html
		});
	}
}
