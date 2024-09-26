import { Controller, Get, Param, Query } from '@nestjs/common';
import { GeneralService } from './general.service';
import { DictionaryDto } from './dto/dictionary.dto';
import { MailService } from './mail.service';

@Controller('general')
export class GeneralController {
  constructor(
    private readonly generalService: GeneralService,
    private readonly mailService: MailService,
  ) {}

  // dictionary------------------------------------------------------------------------------

  @Get('/dictionary')
  findAll(@Query() dictionaryDto: DictionaryDto) {
    return this.generalService.findAll(dictionaryDto);
  }

  @Get('/dictionary/:id')
  findOne(@Param('id') id: string) {
    return this.generalService.findOne(+id);
  }

  // dictionary------------------------------------------------------------------------------

  // mail
  // @Post('/mail')
  // sendMail(@Body() params: any) {
  //   return this.mailService.sendSomeEmail(params.to);
  // }
}
