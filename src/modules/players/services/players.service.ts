import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Player } from "../entities/player.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";

@Injectable()
export class PlayerService {

    constructor(
        @InjectRepository(Player) private readonly playerRepository: Repository<Player>
    ) {}

    async createPlayer( createPlayerDto: CreatePlayerDto ): Promise<Player> {
        try {
            
            const verifyPlayer = await this.playerRepository.findOneBy({ id: createPlayerDto.id })

            if ( verifyPlayer ) throw new HttpException('Player already exists', 404);

            const newPlayer = this.playerRepository.create(createPlayerDto);

            await this.playerRepository.save(newPlayer);

            return newPlayer;

        } catch (err) {
            throw new Error(err);
        }
    }

    async getPlayers(): Promise<Player[] | Object> {
        try {
            
            const players = await this.playerRepository.find({ relations: ['tournament'] });

            if ( players.length === 0 ) {
                return {
                    status: 200,
                    message: 'the database has no records to display'
                }
            }

            return players

        } catch (err) {
            throw new Error(err);
        }
    }

    async getPlayerById( idPlayer: string ): Promise<Player | Object> {
        try {

            //const player = await this.playerRepository.findOneBy({ id: idPlayer })

            const query = this.playerRepository.createQueryBuilder('player')
                .leftJoinAndSelect('player.tournament', 'tournament')
                .where('player.id = :idPlayer', { idPlayer })
            
            const player = await query.getOne();
            
            if (!player ) {
                return {
                    status: 200,
                    message: 'there is no user with that id'
                }
            }
            
            return player
            
        } catch (err) {
            throw new Error(err);
        }
    }

    async updatePlayer( idPlayer: string, { position, age }: UpdatePlayerDto ): Promise<Player> {
        try {
            
            const player: Player = await this.playerRepository.preload({ id: idPlayer, position, age })

            if (!player) throw new HttpException('Player not found', HttpStatus.NOT_FOUND);

            await this.playerRepository.save(player);

            return player;

        } catch (err) {
            throw new Error(err);
        }
    }

    async deletePlayer( idPlayer: string ): Promise<string> {
        try {
            
            this.playerRepository.softDelete(idPlayer);

            return `Player with id ${idPlayer} has been deleted`;

        } catch (err) {
            throw new Error(err);
        }
    }

}
