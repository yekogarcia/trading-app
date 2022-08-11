import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { sendRegisterUsers } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { Plans } from './Plans';


export const Sign = () => {
  const navigate = useNavigate();

  const [idPlan, setIdPlans] = useState(0);

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

    if (idPlan == 0) {
      Swal.fire('Selecciona', 'Debes seleccionar algún paquete de subcripción', 'question');
      return;
    }
    formValues.id_plan = idPlan;
    dispatch(sendRegisterUsers(formValues)).then(function (r) {
      if (r.ok) {
            navigate("/validate-pay");
      }
    })
  }


  return (
    <div className='sign'>
      <div className='plans select-plans'>
        <h2>SELECCIONA TU PAQUETE</h2>
        <Plans plan={idPlan} setPlan={setIdPlans} />
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
          <button className='button' type='submit'>Regístrarse</button>
        </div>
        <div className='form-fields'>
          <NavLink to="/login">
            ¿Ya tienes cuenta?
          </NavLink>
          <NavLink to="/validate-pay">
            Validar Pago
          </NavLink>
        </div>
      </form>
    </div>
  )
}
