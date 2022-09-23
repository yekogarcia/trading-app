import Swal from "sweetalert2";
import { fetchWithoutToken } from "../helpers/fetch";

export const getDynamicTables = (pr) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/tb-dynamic/' + pr, 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const getParamsTable = (table) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/params-tb/' + table, 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const getAllTables = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/tables', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const addDynamicTables = (values) => {
    const { table_name, name, id, columns } = values;
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/add-tbdynamic', { table_name, name, id, columns }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
export const deleteRowTables = (id, table) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/delete-row', { id, table }, 'DELETE');
        const body = await resp.json();
        console.log(body);
        if (body.ok) {
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
export const updateStateRow = (id, table, state) => {
    console.log(id);
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/update-state', { id, table, state }, 'PUT');
        const body = await resp.json();
        console.log(body);
        if (body.ok) {
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
export const getSelectDinamicTable = (table) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/select/' + table, 'GET');
        const body = await resp.json();
        // console.log(body);
        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const addRowDynamicTable = (values) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/add-rowdynamic', { ...values }, 'POST');
        let body = await resp.json();
        if (body.ok) {
            body.data[0].key = body.data[0].id;
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const addUsers = (values) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/add-user', { ...values }, 'POST');
        let body = await resp.json();

        console.log(body);
        if (body.ok) {
            body.msg.key = body.msg.id;
            const data = body.msg;
            return data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const getEstudents = (values) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/estudents', 'GET');
        const body = await resp.json();

        // console.log(body)
        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const getUsers = (values) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/users', 'GET');
        const body = await resp.json();

        // console.log(body)
        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const getPaymentsUser = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/payments-users', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const getProfiles = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/profiles', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const getAcademiesProfile = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/academies', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const removeFiles = (values) => {
    console.log(values);
    return async (dispatch) => {
        const resp = await fetchWithoutToken('ad/remove-file',{...values}, 'DELETE');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}