import { Module } from "@nestjs/common";
import { PlayerService } from "./services/players.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "./entities/player.entity";
import { Tournament } from "../tournament/entities/tournament.entity";
import { PlayerCOntroller } from "./controllers/players.controller";
import { Award } from "../awards/entities/awards.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([ Player, Tournament, Award ]) ],
    controllers: [ PlayerCOntroller ],
    providers: [ PlayerService ],
})
export class PlayerModule {}
