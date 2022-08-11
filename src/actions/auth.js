import Swal from "sweetalert2";
import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { useNavigate } from "react-router-dom";

export const initSession = (profile, email, password) => {
    return async (dispatch) => {

        const resp = await fetchWithoutToken('auth/login', { profile, email, password }, 'POST');
        const body = await resp.json();

        console.log(body);

        if (body.ok) {

            localStorage.setItem('token', body.msg.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('logged-init-date', new Date().getTime());

            dispatch(login({
                id: body.msg.id,
                name: body.msg.name,
                logged: true
            }))

        } else {
            console.log(body);
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const sendRegisterUsers = (values) => {
    const { referred_code, name, cell_phone, email, password, repeat_password, terms, id_plan } = values;
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/register', { referred_code, name, cell_phone, email, password, repeat_password, terms, id_plan }, 'POST');
        const body = await resp.json();
        console.log(body);
        if (body.ok) {

            localStorage.setItem('token', body.msg.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            Swal.fire('Ok', 'Se ha registrado correctamente!', 'success');
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
export const getPlans = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/plans', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startCheking = () => {
    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                id: body.id,
                name: body.name,
                logged: true
            }))

        } else {
            console.log(body)
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const execLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }

}

export const getMethodsPay = () => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/methods-pay', 'GET');
        const body = await resp.json();

        if (body.ok) {
            return body.data;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const setRegisterPay = (values) => {
    return async (dispatch) => {
        console.log(values);
        const resp = await fetchWithoutToken('auth/register-pay', values, 'POST');
        const body = await resp.json();

        if (body.ok) {
            return body;
        } else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
const logout = () => ({ type: types.authLogout });