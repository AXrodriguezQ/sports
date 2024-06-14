import { Player } from "src/modules/players/entities/player.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('awards')
export class Award {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    points: number;

    @OneToMany(() => Player, (player) => player.award, { eager: true })
    players: Player[];

    @DeleteDateColumn()
    deletedAt: Date;

}
