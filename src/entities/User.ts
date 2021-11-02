import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { hashPassword, isValidPassword } from '../utils/hashPassword'
import { Project } from './Project'
import { Report } from './Report'
import { Role } from './Role'

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'first_name' })
	firtsName: string

	@Column({ name: 'last_name' })
	lastName: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ default: true, name: 'is_active' })
	isActive: boolean

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
	updatedAt: Date

	@ManyToOne(() => Role, role => role.users)
	@JoinColumn({ name: 'role_id' })
	role: Role

	@OneToMany(() => Project, project => project.user)
	projects: Project[]

	@OneToMany(() => Report, report => report.user)
	reports: Report[]

	@BeforeInsert()
	async hash() {
		const hash = await hashPassword(this.password)
		this.password = hash
	}

	async comparePasswords(rawPass: string, hashPass: string): Promise<boolean> {
		return await isValidPassword(rawPass, hashPass)
	}
}
