import { SendMailOrderEventPayload } from '@lib/modules/mail';

export abstract class NodemailerService {
	abstract sendMailOrder(options: SendMailOrderEventPayload): Promise<void>;
}
