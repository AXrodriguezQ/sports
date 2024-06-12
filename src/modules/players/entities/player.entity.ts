import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Tournament, ( tournament ) => tournament.players)
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

}
