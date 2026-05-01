import styles from './Header.module.css'
import { Link } from 'react-router';

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <Link to={'/'}>
        <div className={styles["app-name"]}>
          <p>ToDo</p>
          <img src="/src/assets/img/logo.svg" alt="logo" className={styles.logo} />
        </div>
      </Link>
      <nav className={styles["nav-bar"]}>
        <img src="/src/assets/img/menu.svg" alt="menu button" className={styles["main-menu-img"]} />
      </nav>
    </div>
  );
};
