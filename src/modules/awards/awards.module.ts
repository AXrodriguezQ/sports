import { Module } from "@nestjs/common";
import { AwardsController } from "./controllers/awards.controller";
import { AwardsService } from "./services/awards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Award } from "./entities/awards.entity";
import { Player } from "../players/entities/player.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([ Award, Player ]) ],
    controllers: [AwardsController],
    providers: [AwardsService],
})
export class AwardsModule {}
