import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './auth/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
