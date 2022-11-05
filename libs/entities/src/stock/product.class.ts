import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class Product {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;
}
