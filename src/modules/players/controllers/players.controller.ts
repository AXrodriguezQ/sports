import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PlayerService } from "../services/players.service";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { Player } from "../entities/player.entity";
import { UpdatePlayerDto } from "../dtos/update-player.dto";

@Controller('players')
export class PlayerCOntroller {

    constructor( 
        private readonly playerService: PlayerService,
    ) {}

    @Post()
    createPlayer( @Body() createPlayerDto: CreatePlayerDto ): Promise<Player | Object> {
        return this.playerService.createPlayer( createPlayerDto );
    } 

    @Get()
    getPlayers(): Promise<Player[] | Object> {
        return this.playerService.getPlayers();
    }

    @Get(':id')
    getPlayerById( @Param('id') idPlayer: string ): Promise<Player | Object> {
        return this.playerService.getPlayerById( idPlayer );
    }

    @Patch(':id')
    updatePlayer( @Param('id') idPlayer: string, @Body() { position, age }: UpdatePlayerDto ): Promise<Player> {
        return this.playerService.updatePlayer( idPlayer, { position, age } );
    }

    @Delete(':id')
    deletePlayer( @Param('id') idPlayer: string ): Promise<string> {
        return this.playerService.deletePlayer( idPlayer );
    }

    @Post(':id/awards/:idAward')
    addAwardToPlayer( @Param('id') idPlayer: string, @Param('idAward') idAward: string ): Promise<void> {
        return this.playerService.addAwardToPlayer( idPlayer, idAward );
    }

}
