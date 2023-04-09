import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
   
    @PrimaryGeneratedColumn({
        name: 'user_no'
    })
    userNo: number;

    @Column()
    id : string;

    @Column()
    password : string;

    @Column()
    name : string;
    
    @Column()
    email : string;

    @CreateDateColumn({ 
        name: 'created_at'
    })
    createdAt : Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt : Date;
}

