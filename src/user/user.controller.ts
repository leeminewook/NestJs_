import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './creat-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entitiy';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   
    constructor(private readonly userService: UserService) {}

    @Get('/:userNo')
    getUserById(@Param('userNo') userNo: number):Promise<User>{
        return this.userService.getUserById(userNo);
    }

    @Get('/')
    getUserList():Promise<User[]>{
        return this.userService.getUserList();
    }

    @Post("/")
    createUser(@Body() userData:CreateUserDto):Promise<User>{
        return this.userService.createUser(userData)
    }

    @Delete('/:userNo')
    deleteUser(@Param('userNo') userNo: number):Promise<string>{
        return this.userService.deleteUser(userNo);
    }

    @Patch("/:userNo")
    updateUser(@Param('userNo') userNo:number, @Body() userData:UpdateUserDto):Promise<User>{
        return this.userService.updateUser(userNo,userData)
    }
}
