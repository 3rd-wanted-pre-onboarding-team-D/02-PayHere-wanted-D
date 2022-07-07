import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { Repository } from 'typeorm';
import { FinancialLedgerDayDto } from './dto/financial-ledger.day.dto';
import { FinancialLedgerWriteDto } from './dto/financial-ledger.write.dto';
import { FinancialLedgerGroupDto } from './dto/financial-ledger.group.dto';
import { FinancialLedgerListDto } from './dto/financial-ledger.list.dto';
import { FinancialLedgerResponseDto } from './dto/financial-ledger.response.dto';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';

@Injectable()
export class FinancialLedgerService {
  constructor(
    @InjectRepository(FinancialLedger)
    private readonly financialLedgerRepository: Repository<FinancialLedger>,
  ) {}

  //유저 인증 추가 필요
  async createMemo(financialLedgerWriteDto: FinancialLedgerWriteDto) {
    const { expenditure, income, date, remarks } = financialLedgerWriteDto;

    const memo = this.financialLedgerRepository.create({
      expenditure: expenditure,
      income: income,
      date: date,
      remarks: remarks,
    });

    await this.financialLedgerRepository.save(memo);
    return memo;
  }

  async getOneMemo(id: number): Promise<FinancialLedgerDto> {
    const data = await this.financialLedgerRepository
      .createQueryBuilder('FinancialLedger')
      .where('id = :id', {
        id: id,
      })
      .andWhere('deletedAt IS NULL')
      .getRawOne();

    const result = new FinancialLedgerDto(
      data.id,
      data.expenditure,
      data.income,
      data.date,
      data.remarks,
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
    return result;
  }

  async getAllMemo() {
    const groupData = await this.findDayGroup(3);
    const userData = await this.findUserList(3);

    const resultList = [];

    groupData.forEach((gData) => {
      const dayList: FinancialLedgerListDto[] = [];

      userData.forEach((uData) => {
        //작성일이 같은 경우 그룹화해주기
        if (gData.day_date === uData.day_date) {
          const data = new FinancialLedgerListDto(
            uData.id,
            uData.day_date,
            uData.expenditure,
            uData.income,
            uData.remarks,
          );

          dayList.push(data);
        }
      });

      const dayData = new FinancialLedgerDayDto(gData.today_sum, dayList);
      const finalData = new FinancialLedgerResponseDto(gData.day_date, dayData);
      resultList.push(finalData);
    });

    console.log(resultList);
    return resultList;
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
