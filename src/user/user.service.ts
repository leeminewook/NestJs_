import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './creat-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entitiy';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs"

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) {}

    async getUserById(userNo: number):Promise<User>{
        const response = await this.userRepository.findOneBy({userNo});
    
        
        if(!response){
            throw new NotFoundException(`Can't find User`)
        }
        return response
    }

    async getUserList():Promise<User[]>{
        const response = await this.userRepository.find();
       
       
        if(!response){
            throw new NotFoundException(`Can't find User`)
        }
        return response
    }
    //커밋 테스트
    async createUser(createUserDto:CreateUserDto):Promise<User>{
       const {id,password,name,email} = createUserDto;
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password,salt);
       const response = await this.userRepository.create({
        id,
        password:hashedPassword,
        name,
        email,
       })
       await this.userRepository.save(response);
       return response
    }

    async deleteUser(userNo:number):Promise<string>{
        const response = await this.userRepository.delete(userNo);
        if(!response){
            throw new NotFoundException(`Can't find User`)
        }
        return `deleted User id ${userNo}`
    }


    async updateUser(userNo:number,updateDataDto:UpdateUserDto):Promise<User>{
        const response = await this.userRepository.findOne({where:{
            userNo
        }})

        if(!response){
            throw new NotFoundException("해당 아이디로 유저 정보가 존재하지 않습니다.");
        }
         const salt = await bcrypt.genSalt();
         let hashedPassword
         if(updateDataDto.password){
             hashedPassword = await bcrypt.hash(updateDataDto.password,salt);
         }
      
        const date = new Date(Date.now()+32400000)
        const updateData = {
            id:updateDataDto.id,
            password:hashedPassword,
            name:updateDataDto.name,
            email:updateDataDto.email,
            updatedAt:date
        }
        
        await this.userRepository.update(userNo,updateData);
        const updateResponse = await this.userRepository.findOne({where:{
            userNo
        }})
        return updateResponse
    }
}
