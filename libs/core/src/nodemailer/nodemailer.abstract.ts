import { SendMailOrderOptions } from './nodemailer.interface';

export abstract class NodemailerService {
	abstract sendOrderSuccess(options: SendMailOrderOptions): Promise<void>;
}
