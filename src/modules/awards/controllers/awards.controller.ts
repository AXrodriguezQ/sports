import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AwardsService } from "../services/awards.service";
import { CreateAwardDto } from "../dtos/create-award.dto";
import { UpdateAwardDto } from "../dtos/update-player.dto";
import { AuthGuard } from "src/modules/guards/at.guard";

@Controller('awards')
export class AwardsController {

    constructor(
        private readonly awardsService: AwardsService,
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    async getAwards() {
        return await this.awardsService.getAwards();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getAwardById( @Param('id') id: string ) {
        return await this.awardsService.getAwardById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createAward( @Body() createAwardDto: CreateAwardDto ) {
        return await this.awardsService.createAward(createAwardDto);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateAward( @Param('id') idAward: string, @Body() { name, points }: UpdateAwardDto ) {
        return await this.awardsService.updateAward(idAward, { name, points });
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteAward( @Param('id') idAward: string ) {
        return await this.awardsService.deleteAward(idAward);
    }

}
