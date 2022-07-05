import { EntityRepository, Repository } from 'typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { FinancialLedgerWriteDto } from './dto/financial-ledger.write.dto';
import { User } from 'src/entities/User';

@EntityRepository(FinancialLedger)
export class FinancialLedgerRepository extends Repository<FinancialLedger> {
  async createMemo(financialLedgerWriteDto: FinancialLedgerWriteDto) {
    //const user = User[(1, 'email', 'pwd', [], [])];

    const { expenditure, income, date, remarks } = financialLedgerWriteDto;

    const memo = this.create({
      //user: user,
      expenditure: expenditure,
      income: income,
      date: date,
      remarks: remarks,
    });

    await this.save(memo);
    return memo;
  }
}
