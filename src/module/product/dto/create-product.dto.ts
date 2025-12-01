import { IsNumber, IsString, Length } from "class-validator"

export class CreateProductDto {
  
    @IsString()
    @Length(3,100)
    title:string
  
     @IsString()
    @Length(8,500)
    description:string
  
     @IsNumber()
    price:number
}
