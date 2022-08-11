import { NavLink } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
export const LeftMenu = () => {
  return (
    <div className="siderbar-menu">
      <header>
        <img src="" alt="logo"></img>
      </header>
      <section className="collapse-menu">
        <MenuUnfoldOutlined></MenuUnfoldOutlined>
      </section>
      <nav className="nav-admin">
        <ul>
          <li>
            <NavLink to="academics">ACADEMIAS</NavLink>
          </li>
          <li>
            <NavLink to="marketing">MARKETING DIGITAL</NavLink>
          </li>
          <li>
            <NavLink to="mindest">MINDSET</NavLink>
          </li>
          <li>
            <NavLink to="info-poduct">INFO PRODUCTOS</NavLink>
          </li>
          <li>
            <NavLink to="payments">PAGOS</NavLink>
          </li>
          <li>
            <NavLink to="estudents">ESTUDIANTES</NavLink>
          </li>
          <li>
            <NavLink to="users">USUARIOS</NavLink>
          </li>
          <li>
            <NavLink to="settings">CONFIGURACIÓN DE SERVICIOS</NavLink>
          </li>
          <li>
            <NavLink to="developers">DEVELOPERS</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
