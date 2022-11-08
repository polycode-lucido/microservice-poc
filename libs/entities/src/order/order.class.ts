import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Order {
  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsString()
  username: string;

  @IsOptional()
  date?: string;
}
