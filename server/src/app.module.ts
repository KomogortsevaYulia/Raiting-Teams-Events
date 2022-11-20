import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { EventsModule } from './events/events.module';
import { FormsModule } from './forms/forms.module';

import CONNECTION from './db.connection';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
    ...CONNECTION,
    synchronize:false,
    autoLoadEntities:true
    }),
    UsersModule,
    TeamsModule,
    EventsModule,
    FormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
