import React from 'react'
import { NavLink } from 'react-router-dom';


export const NavbarHead = () => {
    return (
        <nav className='nav-header'>
            <div className='logo'>
                <img src='' alt='logo'/>
            </div>

            <div className='navigate-head'>
                <NavLink
                    // className={({ isActive }) => (isActive ? 'active' : 'abouts')}
                    to="/"
                >
                    Inicio
                </NavLink>
                <NavLink
                    className="company"
                    to="/company"
                >
                    Empresa
                </NavLink>
                <NavLink
                    className="testimonials"
                    to="/testimonials"
                >
                    Testimonios
                </NavLink>
                <NavLink
                    className="services"
                    to="/services"
                >
                    Servicios
                </NavLink>
                <NavLink
                    className="services"
                    to="/contact"
                >
                    Contáctenos
                </NavLink>
                <NavLink
                    className="login"
                    to="/login"
                >
                    Iniciar sesión
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? 'sign-btn active-reg' : 'sign-btn')}
                    to="/sign"
                >
                    Regístrarse
                </NavLink>
            </div>
        </nav>
    )

}
