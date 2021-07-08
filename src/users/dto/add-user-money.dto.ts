import { IsInt, IsPositive } from "class-validator";

export class AddUserMoneyDto {
  @IsInt()
  @IsPositive()
  addMoney: number;
}
