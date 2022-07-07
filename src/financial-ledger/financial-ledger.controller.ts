import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as CurrentUser } from '../auth/user.decorator';
import { User } from '../entities/User';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FinancialLedgerService } from './financial-ledger.service';

@Controller('/financial-ledgers')
@ApiTags('FinancialLedger')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse()
  async update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) financialLedgerId: number,
    @Body(new ValidationPipe({ transform: true })) body: UpdateRequestDto,
  ) {
    return this.financialLedgerService.update(user, financialLedgerId, body);
  }

  @Put('/:id/cancellation')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse()
  async delete(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) financialLedgerId: number,
  ) {
    return this.financialLedgerService.delete(user, financialLedgerId);
  }

  @Put('/:id/restoration')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse()
  async restore(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) financialLedgerId: number,
  ) {
    return this.financialLedgerService.restore(user, financialLedgerId);
  }
}
