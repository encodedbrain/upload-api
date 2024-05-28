/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDTO } from '../../dto/authUserDTO';
import { CreateUserDTO } from 'dto/createUserDTO';


@Controller('v1')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('signin')
  async signIn(@Body() signInDto: AuthUserDTO): Promise<any> {
    if (!signInDto.name || !signInDto.password) return
    return await this.authService.signIn(signInDto);
  }


  @Post('signup')
  async handleCreateNewUser(@Body() User: CreateUserDTO): Promise<any> {
    if (!User.password || !User.email || !User.name) return "operation failed: something missing here"
    return await this.authService.signUp(User).then(response => response).catch(error => error);
  }
}
