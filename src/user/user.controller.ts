import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return {
      success: true,
      data: createUserDTO,
      message: 'User created successfully',
    };
  }
}
