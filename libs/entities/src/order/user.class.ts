import { IsString } from 'class-validator';

export class User {
  @IsString()
  username: string;
}
