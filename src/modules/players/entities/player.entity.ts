import { Award } from "src/modules/awards/entities/awards.entity";
import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Award, (award) => award.players)
    @JoinColumn({ name: 'award_id' })
    award: Award;

    @ManyToOne(() => Tournament, ( tournament ) => tournament.players)
    @JoinColumn({ name: 'tournament_id' })
    tournament: Tournament;

    @DeleteDateColumn()
    deletedAt: Date;

}
