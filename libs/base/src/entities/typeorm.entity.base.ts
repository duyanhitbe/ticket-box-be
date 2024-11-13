import { BaseEntity } from './entity.base.abstract';
import {
	BaseEntity as TypeormBaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export class BaseTypeormEntity extends TypeormBaseEntity implements BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn({ type: 'timestamptz' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt!: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	deletedAt!: Date;
}
