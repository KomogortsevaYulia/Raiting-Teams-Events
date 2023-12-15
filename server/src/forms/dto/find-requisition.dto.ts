import { IsNumber, IsOptional } from 'class-validator';

export class FindRequisitionDto {
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  team_id: number;

  @IsOptional()
  @IsNumber()
  requisition_id: number;
}
