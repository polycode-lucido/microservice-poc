import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class Order {
  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsString()
  username: string;

  @IsOptional()
  @IsDate()
  date: Date;
}
