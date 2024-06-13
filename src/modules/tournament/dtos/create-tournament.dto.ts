import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {

    @IsNumber()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
        
    @IsString()
    @IsOptional()
    description: string;
    
    @IsDate()
    @IsOptional()
    endDate: Date;

}