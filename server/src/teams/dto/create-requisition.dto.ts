import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateRequisitionDto {
  @IsInt()
  userId: number;

  @IsInt()
  teamId: number;

  @IsArray()
  @IsString({ each: true })
  fields: string[];
}
