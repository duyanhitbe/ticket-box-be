import { UserEntity } from './user.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
	@Column()
	username!: string;

	@Column()
	@Exclude()
	password!: string;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
