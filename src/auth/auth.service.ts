import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async register(user: CreateUserDTO): Promise<User | undefined> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userService.create({
            ...user,
            password: hashedPassword
        });
        return newUser;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(username: string, password: string): Promise<{ access_token: string | null }> {
        const user = await this.validateUser(username, password);
        if (!user) {
          throw new UnauthorizedException();
        }
      
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      
}
