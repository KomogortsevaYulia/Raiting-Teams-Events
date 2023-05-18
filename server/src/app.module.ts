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

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
      logging:  false,
    }),
    UsersModule,
    TeamsModule,
    EventsModule,
    FormsModule,
    GeneralModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
