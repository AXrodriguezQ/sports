import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('players')
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    position?: string;

    @Column()
    age: number;

    @ManyToOne(() => Tournament, ( tournament ) => tournament.players)
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @DeleteDateColumn()
    deletedAt: Date;

}
