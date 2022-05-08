import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Report } from './Report'
import { User } from './User'

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ default: true, name: 'is_active' })
	isActive: boolean

	@Column({ name: 'start_date', type: 'timestamptz' })
	startDate: Date

	@Column({ name: 'end_date', type: 'timestamptz', nullable: true })
	endDate: Date

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
	updatedAt: Date

	@ManyToOne(() => User, user => user.projects)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToMany(() => Report, report => report.projects)
	reports: Report[]
}
