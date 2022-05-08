import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Project } from './Project'
import { User } from './User'

@Entity({ name: 'reports' })
export class Report extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'float' })
	percentage: number

	@Column({ name: 'date', type: 'timestamptz' })
	date: Date

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
	updatedAt: Date

	@ManyToOne(() => User, user => user.reports)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToMany(() => Project, project => project.reports)
	@JoinTable({
		name: 'report_project',
		joinColumn: { name: 'report_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
	})
	projects: Project[]
}
