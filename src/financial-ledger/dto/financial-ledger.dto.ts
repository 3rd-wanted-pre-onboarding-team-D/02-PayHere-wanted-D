//가계부 작성 DTO
export class FinancialLedgerDto {
  userId: string;
  expenditure: number;
  income: number;
  date: Date;
  remarks: string;
}
