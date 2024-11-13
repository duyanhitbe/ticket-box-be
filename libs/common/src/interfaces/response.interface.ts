import { PaginationMeta } from '@lib/base/dto';

export interface IResponse {
	statusCode: number;
	message: string;
	data: any;
}

export interface IListResponse {
	statusCode: number;
	message: string;
	data: any[];
	meta: PaginationMeta;
}
