import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { execLogout } from "../../actions/auth";

export const NavbarAdmin = () => {

  const dispatch = useDispatch();
  const [openOptionsProfile, setOpenOptionsProfile] = useState('close')
  const [iconOptions, setIconOptions] = useState('arrow_drop_up')

  useEffect(() => {
    if (openOptionsProfile === 'close') {
      document.querySelector(".dropdown-menu").style.display = 'none';
    } else {
      document.querySelector(".dropdown-menu").style.display = 'block';
    }
  });


  const handleOptionsProfile = (e) => {
    e.preventDefault();
    if (openOptionsProfile === 'close') {
      setOpenOptionsProfile('open')
      setIconOptions('arrow_drop_down');
    } else {
      setIconOptions('arrow_drop_up');
      setOpenOptionsProfile('close');
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(execLogout());
  }

  return (
    <header className="header-admin">
      <section className="notification">

      </section>
      <section className="profile-details">
        <ul>
          <li className="li-profile">
            <a href="" className="link-profile" onClick={handleOptionsProfile}>
              <div className="profile">
                <span>
                  <img src="" alt="img-usr" />
                </span>
                <div className="details-user">
                  <p><b>Yeko</b></p>
                  <p>Adminitrador</p>
                </div>
                <i className="large material-icons">{iconOptions}</i>
              </div>
            </a>
            <ul className="dropdown-menu">
              <li><NavLink to="#">
                <i className="medium material-icons">person</i>
                Perfil
              </NavLink></li>
              <li><NavLink to="" onClick={handleLogout}>
                <i className="medium material-icons">arrow_forward</i>
                Salir
              </NavLink></li>
            </ul>
          </li>
        </ul>
      </section>
    </header>
  )
}
