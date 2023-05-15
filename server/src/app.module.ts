import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { EventsModule } from './events/events.module';
import CONNECTION from './db.connection';
import { FormsModule } from './forms/forms.module';
import { GeneralModule } from './general/general.module';
import { UploadsModule } from './uploads/uploads.module';
import { FunctionsModule } from './functions/functions.module';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
      logging:  true,
    }),
    UsersModule,
    TeamsModule,
    EventsModule,
    FormsModule,
    GeneralModule,
    UploadsModule,
    FunctionsModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
