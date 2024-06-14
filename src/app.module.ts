import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { PlayerModule } from './modules/players/players.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { AwardsModule } from './modules/awards/awards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.db,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayerModule,
    TournamentModule,
    AwardsModule,
  ],
})
export class AppModule {}
