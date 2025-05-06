import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({unique:true})
    @IsNotEmpty({ message: 'Username is required' })
    @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
    username:string;

    @Column()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(8, 50, { message: 'Password must be between 8 and 50 characters' })
    password:string;

    @Column({unique:true})
    email:string;

    @Column()
    phoneNumber:string;

    @Column()
    role:string;
}