import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      data:process.env.DB_HOST
    };
  }
}
