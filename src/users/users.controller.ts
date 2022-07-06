import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { LogInBodyDto } from './dto/request/log-in-body.dto';
import { SingUpBodyDto } from './dto/request/sign-up-body.dto';
import { ResponseToken } from './dto/response/common/response-token.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post('sign-up')
  async signUp(@Body() signUpBodyDto: SingUpBodyDto) {
    await this.usersService.signUp(signUpBodyDto);
    return null;
  }

  @HttpCode(200)
  @Post('log-in')
  async login(
    @Headers('User-Agent') userAgent: string,
    @Body() logInBodyDto: LogInBodyDto,
  ) {
    if (!userAgent || !userAgent.length)
      throw new BadRequestException('User-Agent 값은 필수입니다.');

    const [accessToken, refreshToken] = await this.usersService.logIn(
      logInBodyDto,
      userAgent,
    );

    return new ResponseToken(accessToken, refreshToken);
  }

  // header jwt token 필요
  @HttpCode(200)
  @Post('log-out')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logout(@Headers('User-Agent') userAgent: string) {
    if (!userAgent || !userAgent.length)
      throw new BadRequestException('User-Agent 값은 필수입니다.');

    const [accessToken, refreshToken] = await this.usersService.logOut(
      userAgent,
    );

    return new ResponseToken(accessToken, refreshToken);
  }
}
