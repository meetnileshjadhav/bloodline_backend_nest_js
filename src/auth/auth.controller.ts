import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('register')
    async register(@Body() registerDTO:CreateUserDTO) {
        return this.authService.register(registerDTO);
    }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDTO })
    async login(@Body() loginDTO: LoginDTO, @Request() req:any) {
        return this.authService.login(loginDTO.username, loginDTO.password);
    }
}
