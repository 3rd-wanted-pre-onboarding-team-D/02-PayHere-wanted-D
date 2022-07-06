import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { User } from 'src/entities/User';
import { FinancialLedgerGroupDto } from './dto/financial-ledger.group.dto';
import { FinancialLedgerListDto } from './dto/financial-ledger.list.dto';
import { map } from 'rxjs';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerResultDto } from './dto/financial-ledger.result.dto';

@EntityRepository(FinancialLedger)
export class FinancialLedgerRepository extends Repository<FinancialLedger> {
  async createMemo(financialLedgerDto: FinancialLedgerDto) {
    const { expenditure, income, date, remarks } = financialLedgerDto;

    const memo = this.create({
      expenditure: expenditure,
      income: income,
      date: date,
      remarks: remarks,
    });

    await this.save(memo);
    return memo;
  }

  async getAll() {
    const groupData = await this.findDayGroup(2);
    const userData = await this.findUserList(2);

    const userList: Map<string, FinancialLedgerResultDto> = new Map();

    groupData.forEach((gData) => {
      const groupDay = gData.day;
      userList.set(groupDay, {
        money: gData.sum,
        memolist: [],
      });

      userData.forEach((uData) => {
        if (uData.day_date === groupDay && gData.id.includes(uData.id)) {
          userList
            .get(groupDay)
            .memolist.push(
              new FinancialLedgerListDto(
                uData.id,
                uData.expenditure,
                uData.income,
                uData.remarks,
              ),
            );
        }
      });
    });

    console.log(userList);
  }

  async findDayGroup(userId: number): Promise<FinancialLedgerGroupDto[]> {
    //하루단위 그룹화한 데이터 (yyyy-mm-dd, 사용금액총량, 동일날짜인 메모들의 아이디)
    const data = await this.createQueryBuilder('FinancialLedger')
      .select([
        `DATE_FORMAT(date,'%Y/%m/%d') AS day_date`,
        `SUM(income) - SUM(expenditure) AS today_sum`,
        `group_concat(id) as 'idxs'`,
      ])
      .where('userId = :userId', {
        userId: 2,
      })
      .andWhere('deletedAt IS NULL') //삭제된 기록이 없을때 by 최아름
      .groupBy('day_date')
      .orderBy('day_date', 'DESC')
      .getRawMany();
    //console.log(data);
    return data;
  }

  async findUserList(userId: number): Promise<FinancialLedgerListDto[]> {
    const todayList = await this.createQueryBuilder('FinancialLedger')
      .select([
        'id',
        `DATE_FORMAT(date,'%Y/%m/%d') AS day_date`,
        'expenditure',
        'income',
        'remarks',
      ])
      .where('userId = :userId', {
        userId: 2,
      })
      .orderBy('day_date', 'DESC')
      .addOrderBy('id', 'DESC')
      .getRawMany();

    //console.log(todayList);
    return todayList;
  }
}
