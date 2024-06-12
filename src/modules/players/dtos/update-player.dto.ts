import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePlayerDto {
        
    @IsString()
    @IsOptional()
    position: string;
    
    @IsNumber()
    @IsOptional()
    age: number;

}