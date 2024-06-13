import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TournamentService } from "../services/tournament.service";
import { CreateTournamentDto } from "../dtos/create-tournament.dto";
import { Tournament } from "../entities/tournament.entity";
import { UpdateTournamentDto } from "../dtos/update-tournament.dto";

@Controller('tournaments')
export class TournamentController {

    constructor(
        private readonly tournamentService: TournamentService,
    ) {}

    @Post()
    createTournament( @Body() createTournamentDto:CreateTournamentDto ): Promise<Tournament | object> {
        return this.tournamentService.createTournament( createTournamentDto );
    }

    @Get()
    getTournaments(): Promise<Tournament[] | object> {
        return this.tournamentService.getTournaments();
    }

    @Get(':id')
    getTournamentById( @Param('id') idTournament: string ): Promise<Tournament | object> {
        return this.tournamentService.getTournamentById( idTournament );
    }

    @Post(':id/players/:idPlayer')
    addPlayer( @Param('id') idTournament: string, @Param('idPlayer') idPlayer: string ) {
        return this.tournamentService.addPlayer( idTournament, idPlayer );
    }

    @Post(':id')
    updateTournament( @Param('id') idTournament: string, @Body() { name, description, endDate }: UpdateTournamentDto ): Promise<Tournament> {
        return this.tournamentService.updateTournament( idTournament, { name, description, endDate } );
    }

    @Post(':id')
    deleteTournament( @Param('id') idTournament: string ): Promise<string> {
        return this.tournamentService.deleteTournament( idTournament );
    }

}
