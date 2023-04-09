import { Injectable } from '@nestjs/common'
import { EntityManager, Repository } from 'typeorm'
import { User } from './user.entitiy'

@Injectable()
export class UserRepository extends Repository<User> {
    
}