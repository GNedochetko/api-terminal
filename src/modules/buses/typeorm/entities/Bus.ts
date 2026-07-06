import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import Company from '@modules/companies/typeorm/entities/Company';

@Entity('buses')
export default class Bus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    plate: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @Column()
    year: number;

    @Column()
    passenger_capacity: number;

    @Column()
    current_mileage: number;

    @Column()
    last_maintenance_date: Date;

    @Column({ type: 'uuid', nullable: true })
    company_id: string;

    @ManyToOne(() => Company, company => company.buses)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
