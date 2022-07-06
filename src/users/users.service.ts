import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeviceDetectorService } from 'src/common/device-detector/device-detector.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { User } from 'src/entities/User';
import { LogInBodyDto } from './dto/request/log-in-body.dto';
import { SingUpBodyDto } from './dto/request/sign-up-body.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly deviceDetectorService: DeviceDetectorService,
    // private readonly authService: AuthService,
  ) {}

  async isExistUser(email: string) {
    return this.usersRepository.findUserByEmail(email);
  }

  async signUp(signUpBodyDto: SingUpBodyDto) {
    const { email, password } = signUpBodyDto;

    // email 중복 체크
    const user = await this.isExistUser(email);
    if (user) throw new ConflictException('이미 회원가입된 유저입니다.');

    // 비밀번호 해싱
    const encryptedPassword = await this.hashingService.hash(password);

    const newUser = new User();
    newUser.email = email;
    newUser.password = encryptedPassword;

    await this.usersRepository.createUser(newUser);
  }

  async logIn(logInBodyDto: LogInBodyDto, userAgent: string) {
    const { email, password } = logInBodyDto;

    const user = await this.isExistUser(email);

    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    // 비밀번호 비교
    const isMatch = await this.hashingService.compare(password, user.password);

    if (!isMatch)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    const deviceInfo = await this.deviceDetectorService.parse(userAgent);

    let parsedUserAgent: string;

    if (!deviceInfo.client) parsedUserAgent = userAgent;
    else {
      parsedUserAgent =
        deviceInfo.client.name +
        deviceInfo.os.name +
        deviceInfo.os.version +
        deviceInfo.device.type +
        deviceInfo.device.model;
    }

    // 토큰 생성
    const createdToken = await this.authService.createToken(
      user.id,
      parsedUserAgent,
    );

    // user entity에 token entity 저장;

    return [createdToken.accessToken, createdToken.refreshToken];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logOut(userAgent: string) {
    const deviceInfo = await this.deviceDetectorService.parse(userAgent);

    let parsedUserAgent: string;

    if (!deviceInfo.client) parsedUserAgent = userAgent;
    else {
      parsedUserAgent =
        deviceInfo.client.name +
        deviceInfo.os.name +
        deviceInfo.os.version +
        deviceInfo.device.type +
        deviceInfo.device.model;
    }

    // parsedUserAgent를 갖고 있고 userId가 일치하는 token을 찾고 삭제

    return [null, null];
  }
}
