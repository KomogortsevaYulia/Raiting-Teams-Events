import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralService } from './general.service';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  // @Post()
  // create(@Body() createGeneralDto: CreateGeneralDto) {
  //   return this.generalService.create(createGeneralDto);
  // }

  // dictionary------------------------------------------------------------------------------

  @Get("dictionary")
  findAll() {
    return this.generalService.findAll();
  }

  @Get('dictionary/:id')
  findOne(@Param('id') id: string) {
    return this.generalService.findOne(+id);
  }

  // dictionary------------------------------------------------------------------------------


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGeneralDto: UpdateGeneralDto) {
  //   return this.generalService.update(+id, updateGeneralDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalService.remove(+id);
  }
}
