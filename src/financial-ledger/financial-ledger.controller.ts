import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { User } from 'src/entities/User';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerService } from './financial-ledger.service';

@Controller('financial-ledger')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}

  @Post()
  async createMemo(@Body() financialLedgerDto: FinancialLedgerDto) {
    return await this.financialLedgerService.createMemo(financialLedgerDto);
  }

  @Get('/:id')
  async getOneMemo(@Param('id') id: number) {
    return await this.financialLedgerService.getOneMemo(id);
  }
}
