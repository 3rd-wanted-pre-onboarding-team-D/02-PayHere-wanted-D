import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Matches } from 'class-validator';

//가계부 작성 DTO
export class FinancialLedgerWriteDto {
  @IsNumber()
  expenditure: number;

  @IsNumber()
  income: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  remarks: string;
}
