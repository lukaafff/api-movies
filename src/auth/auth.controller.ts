import { Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
  import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
      return this.authService.login(loginDto);
    }
  }