import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

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
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}