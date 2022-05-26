import Swal from "sweetalert2";
import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"

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
    const { referred_code, name, cell_phone, email, password, repeat_password, terms } = values;
    return async (dispatch) => {
        const resp = await fetchWithoutToken('auth/register', { referred_code, name, cell_phone, email, password, repeat_password, terms }, 'POST');
        const body = await resp.json();

        if (body.ok) {

            localStorage.setItem('token', body.msg.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            Swal.fire('Ok', 'Se ha registrado correctamente!', 'success');

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

export const execLogout =()=>{
    return (dispatch) =>{
        localStorage.clear();
        dispatch(logout());
    }

}
const logout =() =>({ type: types.authLogout});