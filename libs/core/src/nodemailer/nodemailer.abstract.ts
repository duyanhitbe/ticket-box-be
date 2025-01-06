import { SendMailOrderFailOptions, SendMailOrderSuccessOptions } from './nodemailer.interface';

export abstract class NodemailerService {
	abstract sendOrderSuccess(options: SendMailOrderSuccessOptions): Promise<void>;

	abstract sendOrderFail(options: SendMailOrderFailOptions): Promise<void>;
}
