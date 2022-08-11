import { types } from "../types/types";

export const sendNotTypesEdit = (e) => ({
    type: types.editNotItems,
    editable: false
});

export const sendTypesEdit = (e) => ({
    type: types.editItems,
    payload: e,
    editable: true
  });