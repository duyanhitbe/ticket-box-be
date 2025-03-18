import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class NewsEntity extends BaseEntity {
	/**
	 * Tiêu đề
	 */
	@SwaggerProperty()
	@Property('Tiêu đề')
	title!: string;

	/**
	 * Thumbnail
	 */
	@SwaggerProperty()
	@Property('Thumbnail')
	thumbnail!: string;

	/**
	 * Nội dung
	 */
	@SwaggerProperty()
	@Property('Nội dung')
	content!: string;

	/**
	 * Thứ tự hiển thị
	 */
	@SwaggerProperty()
	@Property('Thứ tự hiển thị')
	order!: number;
}
