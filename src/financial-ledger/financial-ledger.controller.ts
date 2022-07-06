import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { User } from 'src/entities/User';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerService } from './financial-ledger.service';

@Controller('api/financial-ledger/memo')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}

  //가계부 작성
  @Post()
  async createMemo(@Body() financialLedgerDto: FinancialLedgerDto) {
    return await this.financialLedgerService.createMemo(financialLedgerDto);
  }

  //가계부 1개의 내역 상세 확인
  @Get('/:id')
  async getOneMemo(@Param('id') id: number) {
    return await this.financialLedgerService.getOneMemo(id);
  }

  //작성한 가계부 리스트 전부
  @Get()
  async getAllMemo() {
    return await this.financialLedgerService.getAllMemo();
  }
}
