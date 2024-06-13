import { Module } from "@nestjs/common";
import { TournamentController } from "./controllers/tournament.controller";
import { TournamentService } from "./services/tournament.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "../players/entities/player.entity";
import { Tournament } from "./entities/tournament.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([ Player, Tournament ]) ],
    controllers: [ TournamentController ],
    providers: [ TournamentService ],
})
export class TournamentModule {}
