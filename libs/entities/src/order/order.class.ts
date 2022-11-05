import { IsNumber, IsString } from 'class-validator';

export class Order {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  username: string;
}
