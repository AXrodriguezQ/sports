import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TournamentService } from "../services/tournament.service";
import { CreateTournamentDto } from "../dtos/create-tournament.dto";
import { Tournament } from "../entities/tournament.entity";
import { UpdateTournamentDto } from "../dtos/update-tournament.dto";
import { AuthGuard } from "src/modules/guards/at.guard";

@Controller('tournaments')
export class TournamentController {

    constructor(
        private readonly tournamentService: TournamentService,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    createTournament( @Body() createTournamentDto:CreateTournamentDto ): Promise<Tournament | object> {
        return this.tournamentService.createTournament( createTournamentDto );
    }

    @Get()
    @UseGuards(AuthGuard)
    getTournaments(): Promise<Tournament[] | object> {
        return this.tournamentService.getTournaments();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getTournamentById( @Param('id') idTournament: string ): Promise<Tournament | object> {
        return this.tournamentService.getTournamentById( idTournament );
    }

    @Post(':id/players/:idPlayer')
    @UseGuards(AuthGuard)
    addPlayer( @Param('id') idTournament: string, @Param('idPlayer') idPlayer: string ) {
        return this.tournamentService.addPlayer( idTournament, idPlayer );
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    updateTournament( @Param('id') idTournament: string, @Body() { name, description, endDate }: UpdateTournamentDto ): Promise<Tournament> {
        return this.tournamentService.updateTournament( idTournament, { name, description, endDate } );
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    deleteTournament( @Param('id') idTournament: string ): Promise<string> {
        return this.tournamentService.deleteTournament( idTournament );
    }

}
