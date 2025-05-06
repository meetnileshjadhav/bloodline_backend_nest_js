import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Required Roles:', requiredRoles); // Log the required roles for debugging
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log('User:', user); // Log the user object for debugging
        return requiredRoles.some((role) => user?.role === role);
    }
}