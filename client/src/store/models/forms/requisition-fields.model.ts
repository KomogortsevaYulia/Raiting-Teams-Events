import type { IFormField } from "@/store/models/forms/form-field.model";

export interface IRequisitionField {
  id?: number;
  value?: string;
  form_field?: IFormField[];
}

export interface ICreateRequisition {
  team_id: number;
  fields: string[];
}
