import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTournamentDto {

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