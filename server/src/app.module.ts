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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/'),
      exclude: ['/api/(.*)'],
      serveRoot: '/public/', //last slash was important, otherwise he is looking for index.html
    }),
    UsersModule,
    TeamsModule,
    EventsModule,
    FormsModule,
    GeneralModule,
    UploadsModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
