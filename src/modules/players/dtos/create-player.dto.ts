import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {

    @IsNumber()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
        
    @IsString()
    @IsOptional()
    position: string;
    
    @IsNumber()
    @IsNotEmpty()
    age: number;

}