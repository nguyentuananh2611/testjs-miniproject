function Sidebar() {
  let abc = "";
  let varColor = "#F2F6F9";
  return (
    <>
      <nav className="sidebar">
        <div className="list__navbar">
          <div className="v-menu"></div>
          <a
            href={abc}
            className="sidebar__item"
            style={{ backgroundColor: varColor }}
          >
            loài nguy cấp quý hiếm
          </a>
          <div className="v-menu"></div>
          <a href={abc} className="sidebar__item">
            quản lý người dùng
          </a>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
