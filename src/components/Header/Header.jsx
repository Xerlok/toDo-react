export default function Header() {
  return (
    <div className="global-container">
      <div className="header">
        <div className="app-name">
          <p>ToDo</p>
          <img src="/src/assets/img/logo.svg" alt="logo" className="logo" />
        </div>
        <nav className="nav-bar">
          <img src="/src/assets/img/menu.svg" alt="menu button" className="main-menu-img" />
        </nav>
      </div>
    </div>
  );
};
