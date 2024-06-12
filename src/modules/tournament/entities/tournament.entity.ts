import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournament')
export class Tournament {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

} 
