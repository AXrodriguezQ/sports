import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tournament } from "../entities/tournament.entity";
import { Repository } from "typeorm";
import { CreateTournamentDto } from "../dtos/create-tournament.dto";
import { UpdateTournamentDto } from "../dtos/update-tournament.dto";
import { Player } from "src/modules/players/entities/player.entity";

@Injectable()
export class TournamentService {

    constructor(
        @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>,
        @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
    ) {}

    async createTournament( createTournamentDto: CreateTournamentDto ): Promise<Tournament | Object> {
        try {
            
            const verifyTournamnet = await this.tournamentRepository.findOneBy({ id: createTournamentDto.id });

            if ( verifyTournamnet ) {
                return {
                    status: 200,
                    message: "Tournament already exists"
                }
            }

            const newTournament = this.tournamentRepository.create(createTournamentDto);

            await this.tournamentRepository.save(newTournament);

            return newTournament;

        } catch (err) {
            throw new Error(err)
        }
    }

    async getTournaments(): Promise<Tournament[] | object> {
        try {
            
            const tournaments = await this.tournamentRepository.find();

            if ( tournaments.length === 0 ) {
                return {
                    status: 200,
                    message: 'the database has no records to display'
                }
            }

            return tournaments

        } catch (err) {
            throw new Error(err)
        }
    }

    async getTournamentById( idTournament: string ) {
        try {
            
            const query = this.tournamentRepository.createQueryBuilder('tournament')
                .leftJoinAndSelect('tournament.players', 'players')
                .where('tournament.id = :idTournament', { idTournament })

            const tournament = await query.getOne();

            if (!tournament ) {
                return {
                    status: 200,
                    message: 'there is no tournament with that id'
                }
            }

            return tournament;

        } catch (err) {
            throw new Error(err)
        }
    }

    async updateTournament( idTournament: string, { name, description, endDate }: UpdateTournamentDto ): Promise<Tournament> {
        try {
            
            const tournament: Tournament = await this.tournamentRepository.preload({ id: idTournament, name, description, endDate })

            if ( !tournament ) throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND)

            await this.tournamentRepository.save(tournament)

            return tournament

        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteTournament( idTournament: string ): Promise<string> {
        try {

            const tournament = await this.tournamentRepository.findOneBy({ id: idTournament })

            if ( !tournament ) throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND)
                        
            await this.tournamentRepository.softDelete(idTournament)

            return `Tournament with id ${idTournament} has been deleted`;

        } catch (err) {
            throw new Error(err)
        }
    }

    async addPlayer( idTournament: string, idPlayer: string ) {
        try {
            
            const tournament: Tournament = await this.tournamentRepository.findOneBy({ id: idTournament })

            const player: Player = await this.playerRepository.findOneBy({ id: idPlayer })

            if ( !tournament || !player ) throw new HttpException("Tournament or player not found", HttpStatus.NOT_FOUND)

            const add = await this.playerRepository.preload({ id: idPlayer, tournament: tournament })

            await this.playerRepository.save(add)

        } catch (err) {
            throw new Error(err)
        }
    }

}
