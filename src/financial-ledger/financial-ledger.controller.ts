import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FinancialLedgerService } from './financial-ledger.service';
import { FinancialLedgerInterceptor } from './interceptor/financial-ledger.interceptor';
import { User as CurrentUser } from '../auth/user.decorator';
import { FinancialLedgerWriteDto } from './dto/financial-ledger.write.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/User';

@UseInterceptors(FinancialLedgerInterceptor)
@Controller('financial-ledgers')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}

  //가계부 작성
  @Post()
  @UseGuards(JwtAuthGuard)
  async createMemo(
    @Body() financialLedgerWriteDto: FinancialLedgerWriteDto,
    @CurrentUser() user: User,
  ) {
    return await this.financialLedgerService.createMemo(
      financialLedgerWriteDto,
      user,
    );
  }

  //작성한 가계부 리스트 전부
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMemo(@CurrentUser() user: User) {
    const result = await this.financialLedgerService.getAllMemo(user.id);
    return result;
  }

  //가계부 1개의 내역 상세 확인
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOneMemo(@Param('id') id: number, @CurrentUser() user: User) {
    const result = await this.financialLedgerService.getOneMemo(id, user.id);
    console.log(result);
    return result;
  }
}
