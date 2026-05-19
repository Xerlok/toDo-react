import styles from './Header.module.css'
import { Link } from 'react-router';
import logo from "../../assets/img/logo.svg";
import menuImg from "../../assets/img/menu.svg";

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <Link to={'/'}>
        <div className={styles["app-name"]}>
          <p>ToDo</p>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
      </Link>
      <nav className={styles["nav-bar"]}>
        <img src={menuImg} alt="menu button" className={styles["main-menu-img"]} />
      </nav>
    </div>
  );
};
