import React from 'react'
import { NavLink } from 'react-router-dom'

export const Fotter = () => {
  return (
    <footer>
      <div className='body-fotter'>
        <div>
          <h4>QUIENES SOMOS</h4>
          <NavLink to="#">
            Misión
          </NavLink>
          <NavLink to="#">
            Visión
          </NavLink>
          <NavLink to="#">
            Paso a paso
          </NavLink>
        </div>
        <div>
          <h4>CONTACTO</h4>
          <p>300 741 848</p>
          <p>PBX: 01 8000 42 58</p>
          <p>Hablemos</p>
        </div>
        <div>
          <h4>SIGUENOS</h4>

        </div>
      </div>
      <div className='Fotter'>
        <h4>2022</h4>
        <p>edfilacademy.com</p>
      </div>
    </footer>
  )
}
