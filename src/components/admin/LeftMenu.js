import { NavLink } from "react-router-dom";

export const LeftMenu = () => {
    return (
        <div className="siderbar-menu">
            <header>
                <img src="" alt="logo"></img>
            </header>
            <nav className="nav-admin">
                <NavLink to="academics">
                    ACADEMIAS
                </NavLink>
                <NavLink to="marketing">
                    MARKETING DIGITAL
                </NavLink>
                <NavLink to="mindest">
                    MINDSET
                </NavLink>
                <NavLink to="info-poduct">
                    INFO PRODUCTOS
                </NavLink>
                <NavLink to="estudents">
                    ESTUDIANTES
                </NavLink>
                <NavLink to="users">
                    USUARIOS
                </NavLink>
                <NavLink to="settings">
                    CONFIGURACIÓN DE SERVICIOS
                </NavLink>
            </nav>
        </div>
    )
}
