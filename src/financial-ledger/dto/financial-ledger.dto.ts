import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

//가계부 작성 DTO
export class FinancialLedgerDto {
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  expenditure: number;

  @IsNumber()
  income: number;

  @IsDate()
  date: Date;
  remarks: string;
}
