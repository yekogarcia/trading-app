import React from 'react'
import { useDispatch } from 'react-redux'
import { initSession } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const Login = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    // email: '',
    // password: ''
    email: 'yekogarcia@yahoo.com',
    password: 'akatsuki123'
  });


  const { email, password } = formValues;


  const executeLogin = (e) => {
    e.preventDefault();
    dispatch(initSession(email, password));
  }

  return (
    <div className='view-login'>
      <div className='login-img'>
        <img src='' alt='img  login' />
      </div>
      <div className='login'>
        <h1><b>¡Ven</b> y se parte de este <b className='green'>gran equipo!</b></h1>
        <a href='' >ESTUDIANTE</a>
        <a href='' >DOCENTE</a>
        <a href='' >ADMINISTRADOR</a>
        <form onSubmit={executeLogin}>
          <div className='logo'>
            <img src='' alt='logo-login' />
          </div>
          <div className='form-fields'>
            <input
              type="text"
              placeholder='Ingresar usuario'
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder='Ingresar contraseña'
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <a href=''>¿Olvidaste tu nombre de usuario o contraseña?</a>
            <button type='submit'>ACCEDER</button>
          </div>
        </form>
      </div>
    </div>
  )
}
