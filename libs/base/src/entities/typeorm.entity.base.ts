import { BaseEntity } from './entity.base.abstract';
import {
	BaseEntity as TypeormBaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { camelToSnake } from '@lib/common/helpers';

export class BaseTypeormEntity extends TypeormBaseEntity implements BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn({ name: camelToSnake('createdAt'), type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ name: camelToSnake('updatedAt'), type: 'timestamptz' })
	updatedAt!: Date;

	@DeleteDateColumn({ name: camelToSnake('deletedAt'), type: 'timestamptz' })
	deletedAt!: Date;
}
