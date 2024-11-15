import { UserEntity } from './user.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { BeforeInsert, Entity } from 'typeorm';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { TypeormColumn, TypeormUnique } from '@lib/common/decorators';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
	@TypeormUnique()
	@TypeormColumn()
	username!: string;

	@TypeormColumn()
	@Exclude()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
