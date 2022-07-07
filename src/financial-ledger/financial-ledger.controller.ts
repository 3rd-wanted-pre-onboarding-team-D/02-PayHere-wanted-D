import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { FinancialLedgerService } from './financial-ledger.service';
import { FinancialLedgerInterceptor } from './interceptor/financial-ledger.interceptor';
import { map } from 'rxjs';
import { FinancialLedgerWriteDto } from './dto/financial-ledger.write.dto';

@UseInterceptors(FinancialLedgerInterceptor)
@Controller('financial-ledgers')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}

  //가계부 작성
  @Post()
  async createMemo(@Body() financialLedgerWriteDto: FinancialLedgerWriteDto) {
    return await this.financialLedgerService.createMemo(
      financialLedgerWriteDto,
    );
  }

  //작성한 가계부 리스트 전부
  @Get()
  async getAllMemo() {
    const result = await this.financialLedgerService.getAllMemo();
    return result;
  }

  //가계부 1개의 내역 상세 확인
  @Get('/:id')
  async getOneMemo(@Param('id') id: number) {
    const result = await this.financialLedgerService.getOneMemo(id);
    return result;
  }
}
