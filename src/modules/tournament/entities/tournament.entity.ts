import { Player } from "src/modules/players/entities/player.entity";
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

    @OneToMany(() => Player, ( player ) => player.tournament)
    players: Player[];

} 
