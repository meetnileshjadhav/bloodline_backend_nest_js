import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./auth-strategy/local.strategy";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth-strategy/jwt.strategy";
import { RolesGuard } from "../auth/roles/role.guard";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:async (configService:ConfigService) => ({
                secret:configService.get<string>('JWT_SECRET'),
                signOptions:{expiresIn:'1h'}
            }),
            inject:[ConfigService]
        })
    ],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,JwtStrategy, RolesGuard],
    exports:[AuthService, RolesGuard]
})
export class AuthModule {}