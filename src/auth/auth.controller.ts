import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('register')
    async register(@Body() registerDTO:CreateUserDTO) {
        return this.authService.register(registerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req:any) {
        return this.authService.login(req.user);
    }
}
