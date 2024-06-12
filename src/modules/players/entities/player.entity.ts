import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('players')
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    position: string;

    @Column()
    age: number;

}
