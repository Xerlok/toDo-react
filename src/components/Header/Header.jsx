import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["app-name"]}>
        <p>ToDo</p>
        <img src="/src/assets/img/logo.svg" alt="logo" className={styles.logo} />
      </div>
      <nav className={styles["nav-bar"]}>
        <img src="/src/assets/img/menu.svg" alt="menu button" className={styles["main-menu-img"]} />
      </nav>
    </div>
  );
};
