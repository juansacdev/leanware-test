import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

export enum RoleType {
	ADMIN = 'admin',
	CLIENT = 'client',
	OPERATIVE = 'operative',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	type: string

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
	updatedAt: Date

	@OneToMany(() => User, user => user.role)
	users: User[]
}
