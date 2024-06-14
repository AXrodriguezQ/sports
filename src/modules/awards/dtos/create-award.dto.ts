import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAwardDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
        
    @IsNumber()
    @IsOptional()
    points: number;

}