import type { IRequisitionField } from "@/store/models/forms/requisition-fields.model";

export interface IFormField {
  id?: number;
  required?: boolean;
  title?: string;
  requisition_field?: IRequisitionField[];
}
