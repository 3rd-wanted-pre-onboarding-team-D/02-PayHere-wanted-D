import { FinancialLedgerListDto } from './financial-ledger.list.dto';

//유저 전달용 - 일자별 그룹화 리스트 DTO
export class FinancialLedgerResultDto {
  money: number;
  memolist: FinancialLedgerListDto[] = [];
}
