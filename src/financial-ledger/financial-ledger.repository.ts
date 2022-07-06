import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { FinancialLedgerWriteDto } from './dto/financial-ledger.write.dto';
import { User } from 'src/entities/User';

@EntityRepository(FinancialLedger)
export class FinancialLedgerRepository extends Repository<FinancialLedger> {
  async createMemo(financialLedgerWriteDto: FinancialLedgerWriteDto) {
    const { expenditure, income, date, remarks } = financialLedgerWriteDto;

    const memo = this.create({
      expenditure: expenditure,
      income: income,
      date: date,
      remarks: remarks,
    });

    await this.save(memo);
    return memo;
  }

  async getAll(userId: number) {
    //하루단위 그룹화한 데이터 (yyyy-mm-dd, 사용금액총량, 동일날짜인 메모들의 아이디)
    const groupDay = await this.createQueryBuilder('FinancialLedger')
      .select([
        `DATE_FORMAT(date,'%Y/%m/%d') AS day_date`,
        `'SUM(income)' - 'SUM(expenditure)' AS today_sum`,
        `group_concat(id) as 'idxs'`,
      ])
      .where('userId = :id', {
        id: userId,
      })
      .andWhere('deletedAt IS NULL') //삭제된 기록이 없을때 by 최아름
      .groupBy('day_date')
      .orderBy('day_date', 'DESC')
      .getMany();
  }
}
