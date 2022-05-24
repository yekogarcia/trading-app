import React from 'react'
import { useDispatch } from 'react-redux';
import { sendRegisterUsers } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


export const Sign = () => {

  const dispatch = useDispatch();

  const [formValues, changeInputChange] = useForm({
    referred_code: '',
    name: '',
    cell_phone: '',
    email: '',
    password: '',
    repeat_password: '',
    terms: ''
  });


  const { referred_code, name, cell_phone, email, password, repeat_password, terms } = formValues;

  const execRegister = (e) => {
    e.preventDefault();
    dispatch(sendRegisterUsers(formValues))
  }


  return (
    <div className='sign'>
      <div className='img-sign'>
        <img src='' alt='img-register' />
      </div>
      <form onSubmit={execRegister}>
        <div className='icon-white'>
          <img src='' alt='icono-edfil' />
        </div>
        <h3>Empieza tu camino al éxito</h3>
        <div className='form-fields'>
          <label>Id de quien lo refiere</label>
          <input
            type="text"
            placeholder='Código Referido'
            name='referred_code'
            value={referred_code}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields'>
          <label>Nombre completo</label>
          <input
            type="text"
            placeholder='Nombres y apellidos'
            name='name'
            value={name}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields'>
          <label>Número de télefono</label>
          <input
            type="text"
            placeholder='Número de télefono'
            name='cell_phone'
            value={cell_phone}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields'>
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder='Correo Electrónico'
            name='email'
            value={email}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields'>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder='Contraseña'
            name='password'
            value={password}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields'>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            placeholder='Confirmar Contraseña'
            name='repeat_password'
            value={repeat_password}
            onChange={changeInputChange}
          />
        </div>
        <div className='form-fields check'>
          <input
            type="checkbox"
            name='terms'
            value={terms}
            onChange={changeInputChange}
          />
          <label>Acepto los terminos,  condiciones y politicas de crehana.</label>
        </div>
        <div className='form-fields'>
          <button type='submit'>Regístrarse</button>
        </div>
        <div className='form-fields'>
          <a href=''>¿Ya tienes cuenta?</a>
        </div>
      </form>
    </div>
  )
}
