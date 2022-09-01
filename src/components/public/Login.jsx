import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { initSession } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const Login = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    // email: '',
    // password: ''
    // email: 'yekogarcia@yahoo.com',
    // password: 'akatsuki123'
  });

  const { email, password } = formValues;
  
  const [classProfile, classSetProfile] = useState("student")
  const [profile, setProfile] = useState(4)
  
  useEffect(() => {
    document.querySelector(".section-profile .green").classList.remove('green');
    document.querySelector("." + classProfile).className += " green";
  })


  const executeLogin = (e) => {
    e.preventDefault();
    dispatch(initSession(profile, email, password));
  }


  const selectProfile = (idProfile, e) => {
    e.preventDefault();
    classSetProfile(e.target.classList[0]);
    setProfile(idProfile);
  }

  return (
    <div className='view-login'>
      <div className='login-img'>
        <img src='' alt='img  login' />
      </div>
      <div className='login'>
        <h1><b>¡Ven</b> y se parte de este <b className='green'>gran equipo!</b></h1>
        <section className='section-profile'>
          <a onClick={(e) => selectProfile(4, e)} className="student green" >ESTUDIANTE</a>
          <a onClick={(e) => selectProfile(3, e)} className="teachers">DOCENTE</a>
          <a onClick={(e) => selectProfile(2, e)} className="administrator">ADMINISTRADOR</a>
        </section>
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
            <button className='button' type='submit'>ACCEDER</button>
          </div>
        </form>
      </div>
    </div>
  )
}
