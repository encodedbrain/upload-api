/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthUserDTO, ICreateUserDTO } from "../../types/global/global"
import { Response } from 'express';

@Controller('v1')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('signin')
  async signIn(@Body() credential: IAuthUserDTO, @Res() response: Response): Promise<string | any> {
    if (!credential.name || !credential.password) return "operation failed: something missing here"
    return await this.authService.signIn(credential, response);
  }

  @Post('signup')
  async handleCreateNewUser(@Body() credential: ICreateUserDTO): Promise<string | any> {
    if (!credential.password || !credential.email || !credential.name) return "operation failed: something missing here"
    return await this.authService.signUp(credential).then(response => response).catch(error => error);
  }

  @Post('send/email')
  async handleSendEmail(@Body() email: string, @Res() response: Response): Promise<string | any> {
    if (!email) return "operation failed: something missing here"
    return await this.authService.generateEmail(email, response).then(response => response).catch(error => console.error(error));
  }

  @Get("forgot-password/:token")
  async handleForgotPassword(@Param("token") token: string, @Res() res: Response): Promise<boolean> {
    if (!token) return false
    return await this.authService.forgotPassword({ token, res })
  }

  @Post("change/password")
  async handleChangePassword(@Body() name: string, @Body() password: string, @Body() newPassword: string, @Res() response: Response): Promise<any> {
    if (!password || !newPassword) return "operation failed: something missing here"
    return await this.authService.changePassword({ name, password, newPassword, response });
  }
}
