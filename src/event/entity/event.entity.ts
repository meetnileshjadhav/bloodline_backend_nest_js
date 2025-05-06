import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    location: string;

    @Column()
    maxAttendees: number;

    @Column({ default: 0 })
    currentAttendees: number;
}