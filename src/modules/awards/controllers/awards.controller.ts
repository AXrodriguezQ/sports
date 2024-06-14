import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AwardsService } from "../services/awards.service";
import { CreateAwardDto } from "../dtos/create-award.dto";
import { UpdateAwardDto } from "../dtos/update-player.dto";

@Controller('awards')
export class AwardsController {

    constructor(
        private readonly awardsService: AwardsService,
    ) {}

    @Get()
    async getAwards() {
        return await this.awardsService.getAwards();
    }

    @Get(':id')
    async getAwardById( @Param('id') id: string ) {
        return await this.awardsService.getAwardById(id);
    }

    @Post()
    async createAward( @Body() createAwardDto: CreateAwardDto ) {
        return await this.awardsService.createAward(createAwardDto);
    }

    @Patch(':id')
    async updateAward( @Param('id') idAward: string, @Body() { name, points }: UpdateAwardDto ) {
        return await this.awardsService.updateAward(idAward, { name, points });
    }

    @Delete(':id')
    async deleteAward( @Param('id') idAward: string ) {
        return await this.awardsService.deleteAward(idAward);
    }

}
