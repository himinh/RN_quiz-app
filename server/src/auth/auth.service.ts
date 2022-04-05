import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthReponseDto } from './dto/auth-reponse.dto';
import { LoginDto } from './dto/login-dto';
import { TokenService } from './token.service';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  // Login user
  async login(loginDto: LoginDto): Promise<AuthReponseDto> {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user || !(await user.isPasswordMatch(loginDto.password)))
      throw new BadRequestException('Incorrect email or password');

    const tokens = await this.tokenService.getAuthTokens(user.id, user.role);

    await this.userService.updateRfToken(user.id, tokens.refresh_token);
    return { user, tokens };
  }

  // Register user
  async register(createUserDto: CreateUserDto): Promise<AuthReponseDto> {
    const user = await this.userService.createUser(createUserDto);
    const tokens = await this.tokenService.getAuthTokens(user.id, user.role);
    await this.userService.updateRfToken(user.id, tokens.refresh_token);
    return { user, tokens };
  }

  // Logout
  async logout(userId: string): Promise<Boolean> {
    await this.userService.removeRfToken(userId);
    return true;
  }

  // Get refresh auth rokens
  async refreshTokens(
    userId: string,
    rfToken: string,
  ): Promise<AuthReponseDto> {
    const user = await this.userService.getUserById(userId);
    if (!user.rfToken || !user.isRfTokenMatch(rfToken))
      throw new ForbiddenException('Access Denied');

    const tokens = await this.tokenService.getAuthTokens(user.id, user.role);
    await this.userService.updateRfToken(user.id, tokens.refresh_token);
    return { user, tokens };
  }
}
