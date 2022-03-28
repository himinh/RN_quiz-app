import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthReponseDto } from './dto/auth-reponse.dto';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User login
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthReponseDto> {
    return this.authService.login(loginDto);
  }

  // Register
  @Post('register')
  register(@Body() userDto: CreateUserDto): Promise<AuthReponseDto> {
    return this.authService.register(userDto);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refreshToken(
    @GetCurrentUserId() userId,
    @GetCurrentUser('rfToken') rfToken,
  ): Promise<AuthReponseDto> {
    return this.authService.refreshTokens(userId, rfToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@GetCurrentUserId() userId) {
    return this.authService.logout(userId);
  }

  // Forgot password
  @Post('forgot-password')
  forgotPassword() {
    // Generate reset passwordToken
    // Send reset password email
  }
}
