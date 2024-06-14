import { Module } from "@nestjs/common";
import { AwardsController } from "./controllers/awards.controller";
import { AwardsService } from "./services/awards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Award } from "./entities/awards.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([ Award ]) ],
    controllers: [AwardsController],
    providers: [AwardsService],
})
export class AwardsModule {}
