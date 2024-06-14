import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Award } from "../entities/awards.entity";
import { Repository } from "typeorm";
import { CreateAwardDto } from "../dtos/create-award.dto";
import { UpdateAwardDto } from "../dtos/update-player.dto";

@Injectable()
export class AwardsService {

    constructor(
        @InjectRepository(Award) private readonly awardRepository: Repository<Award>,
    ) {}

    async createAward( createAwardDto: CreateAwardDto ): Promise<Award> {
        try {
            
            const newAward = this.awardRepository.create(createAwardDto);

            await this.awardRepository.save(newAward);

            return newAward;

        } catch (err) {
            throw new Error(err);
        }
    }

    async getAwards(): Promise<Award[] | object> {
        try {

            const awards = await this.awardRepository.find();

            if ( awards.length === 0 ) {
                return {
                    status: 200,
                    message: 'the database has no records to display'
                }
            }

            return awards;

        } catch (err) {
            throw new Error(err);
        }
    }

    async getAwardById( id: string ): Promise<Award | object> {
        try {

            const award = await this.awardRepository.findOneBy({ id });

            if ( !award ) {
                return {
                    status: 200,
                    message: 'there is no user with that id'
                }
            }

            return award;

        } catch (err) {
            throw new Error(err);
        }
    }

    async updateAward( idAward: string, { name, points }: UpdateAwardDto ): Promise<Award> {
        try {
            
            const award = await this.awardRepository.findOneBy({ id: idAward });

            if (!award) throw new HttpException('Player not found', HttpStatus.NOT_FOUND);

            award.name = name;
            award.points = points;
            
            await this.awardRepository.save(award);
            
            return award;

        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteAward( idAward: string ) {
        try {
            
            await this.awardRepository.softDelete(idAward);

            return `Award with id ${idAward} has been deleted`;

        } catch (err) {
            throw new Error(err);
        }
    }

}
