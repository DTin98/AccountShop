import { IsInt, IsPositive } from "class-validator";

export class CutUserMoneyDto {
  @IsInt()
  @IsPositive()
  cutMoney: number;
}
