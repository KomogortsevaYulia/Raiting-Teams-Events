import { ApiProperty } from '@nestjs/swagger';
import { Cabinets } from '../entities/cabinets.entity';

export class GetAllCabinetsResponse {
  @ApiProperty({
    type: Cabinets,
    isArray: true,
    example: [{ id: 1, name: 'В-108' }],
  })
  cabinets: Cabinets[];
  count: number;
}
