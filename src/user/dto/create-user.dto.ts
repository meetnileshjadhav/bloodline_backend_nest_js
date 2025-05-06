import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @MaxLength(20, { message: 'Username must not exceed 20 characters' })
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(50, { message: 'Password must not exceed 50 characters' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid international phone number' })
    phoneNumber: string;

    @IsString({ message: 'Role must be a string' })
    @Matches(/^(admin|user|moderator)$/, { message: 'Role must be one of the following: admin, user, moderator' })
    role: string;
}