import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { Repository } from 'typeorm';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerGroupDto } from './dto/financial-ledger.group.dto';
import { FinancialLedgerListDto } from './dto/financial-ledger.list.dto';
import { FinancialLedgerResultDto } from './dto/financial-ledger.result.dto';

@Injectable()
export class FinancialLedgerService {
  constructor(
    @InjectRepository(FinancialLedger)
    private readonly financialLedgerRepository: Repository<FinancialLedger>,
  ) {}

  //유저 인증 추가 필요
  async createMemo(financialLedgerDto: FinancialLedgerDto) {
    const { expenditure, income, date, remarks } = financialLedgerDto;

    const memo = this.financialLedgerRepository.create({
      expenditure: expenditure,
      income: income,
      date: date,
      remarks: remarks,
    });

    await this.financialLedgerRepository.save(memo);
    return memo;
  }

  async getOneMemo(id: number) {
    return await this.financialLedgerRepository.findOne(id);
  }

  async getAllMemo() {
    const groupData = await this.findDayGroup(3);
    const userData = await this.findUserList(3);

    const userList: Map<string, FinancialLedgerResultDto> = new Map();

    groupData.forEach((gData) => {
      const groupDay = gData.day_date;
      if (!userList.has(groupDay)) {
        userList.set(groupDay, {
          money: gData.today_sum,
          memolist: [],
        });
      }

      userData.forEach((uData) => {
        if (uData.day_date === groupDay && gData.idxs.includes(uData.id)) {
          userList
            .get(groupDay)
            .memolist.push(
              new FinancialLedgerListDto(
                uData.id,
                uData.day_date,
                uData.expenditure,
                uData.income,
                uData.remarks,
              ),
            );
        }
      });
    });
    console.log(userList);
    return userList;
  }

  async findDayGroup(userId: number): Promise<FinancialLedgerGroupDto[]> {
    //하루단위 그룹화한 데이터 (yyyy-mm-dd, 사용금액총량, 동일날짜인 메모들의 아이디)
    const data = await this.financialLedgerRepository
      .createQueryBuilder('FinancialLedger')
      .select([
        `DATE_FORMAT(date,'%Y/%m/%d') AS day_date`,
        `SUM(income) - SUM(expenditure) AS today_sum`,
        `group_concat(id) as 'idxs'`,
      ])
      .where('userId = :uid', {
        uid: userId,
      })
      .andWhere('deletedAt IS NULL') //삭제된 기록이 없을때 by 최아름
      .groupBy('day_date')
      .orderBy('day_date', 'DESC')
      .getRawMany();

    return data;
  }

  async findUserList(userId: number): Promise<FinancialLedgerListDto[]> {
    const todayList = await this.financialLedgerRepository
      .createQueryBuilder('FinancialLedger')
      .select([
        'id',
        `DATE_FORMAT(date,'%Y/%m/%d') AS day_date`,
        'expenditure',
        'income',
        'remarks',
      ])
      .where('userId = :uid', {
        uid: userId,
      })
      .orderBy('day_date', 'DESC')
      .addOrderBy('id', 'DESC')
      .getRawMany();

    return todayList;
  }
}
