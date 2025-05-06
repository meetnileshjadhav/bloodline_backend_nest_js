import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User> 
    ) {}

    async create(user:CreateUserDTO) : Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    

    async findByUsername(username:string): Promise<User|undefined> {
        return this.userRepository.findOneBy({username});
    }
}
