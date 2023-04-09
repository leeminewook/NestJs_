import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './configuration';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entitiy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
      
    }),
    TypeOrmModule.forRoot({
      type:"mysql",
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:[User],
      synchronize:true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
