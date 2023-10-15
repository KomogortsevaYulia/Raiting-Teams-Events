import type { IFormField } from "@/store/models/forms/form-field.model";

export interface IForm {
  id?: number;
  form_field?: IFormField[];
}
