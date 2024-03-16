import { ApiProperty } from '@nestjs/swagger';

export class DeleteCabinetResponse {
  @ApiProperty({
    type: String,

    example: 'Кабинет успешно удален',
  })
  message: string;
}
