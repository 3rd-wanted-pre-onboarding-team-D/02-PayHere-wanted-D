import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Matches,
  MaxLength,
} from 'class-validator';

//가계부 작성 DTO
export class FinancialLedgerWriteDto {
  @IsNumber()
  expenditure: number;

  @IsNumber()
  income: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @MaxLength(20)
  remarks: string;
}
