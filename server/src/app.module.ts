import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import CONNECTION from './db.connection';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
    ...CONNECTION,
    synchronize:false,
    autoLoadEntities:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
