import { IsNotEmpty, IsString } from "class-validator";

export class PDF {
    @IsString()
    @IsNotEmpty()
    file : string
}