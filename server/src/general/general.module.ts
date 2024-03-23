import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary])],
  controllers: [GeneralController],
  providers: [GeneralService, MailService],
})
export class GeneralModule {}
