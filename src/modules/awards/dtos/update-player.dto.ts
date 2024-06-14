import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAwardDto {

    @IsString()
    @IsNotEmpty()
    name: string;
        
    @IsNumber()
    @IsOptional()
    points: number;

}