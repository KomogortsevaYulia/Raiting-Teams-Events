import { defineStore } from "pinia";
import axios from "axios";
import {ApiRequest} from "@/store/handleApiRequest";
import type {IFormField} from "@/store/models/forms/form-field.model";

export const useFormStore = defineStore("form", () => {
  const apiRequest = new ApiRequest();

  async function fetchFormFields(team_id: number) {
    const res = await axios.get("/api/forms/" + team_id);
    const data = res.data;

    return data.form_field;
  }

  async function fetchFormId(team_id: number) {
    (await axios.get("/api/forms/id/" + team_id)).data;
    return (await axios.get("/api/forms/id/" + team_id)).data;
  }

  async function fetchRequisitionAnswers(req_id: number) {
    const res = await axios.get("/api/forms/requisition/" + req_id);

    return res.data;
  }
  async function createFields(title: string, required: boolean, form_id: number,) {
    return apiRequest.handleApiRequest(async () => {
      return await axios.post("/api/forms/field", {
        title: title,
        required: required,
        form: form_id,
      });
    });
  }

  async function archiveField(deletedField: IFormField, is_archive: boolean) {
        return apiRequest.handleApiRequest(async () => {
         return await axios
              .put(`/api/forms/field/${deletedField.id}`, {
                archive: is_archive,
              })
        })
  }

  async function createForm(idTeam: number) {

    return apiRequest.handleApiRequest(async () => {
      return await axios
          .post("/api/forms", {
            team_id: idTeam,
          })
    })
  }

  return {
    fetchFormFields,
    fetchFormId,
    createForm,

    fetchRequisitionAnswers,
    createFields,
    archiveField,

    apiRequest
  };
});
