
function Navbar() {
  let abc = "";
  return (
    <>
      <div className="searchNavbar d-flex">
        <div className="left"></div>

        <div className="d-flex div-wrap">
          <div className="center d-flex">
            <a
              href={abc}
              className="d-flex"
              style={{ backgroundColor: "rgb(42,37,37)" }}
            >
              <span>
                <i className="fa-solid fa-truck-fast"></i>
                <span>Lưới</span>
              </span>
            </a>
            <a href={abc} className="d-flex">
              <span>
                <i className="fa-solid fa-bars"></i>
                <span>Bảng</span>
              </span>
            </a>
            <a href={abc} className="d-flex">
              <span>
                <i className="fa-solid fa-map"></i>
                <span>Bản đồ</span>
              </span>
            </a>
            <a href={abc} className="d-flex">
              <span>
                <i className="fa-solid fa-chart-column"></i>
                <span>Thống kê</span>
              </span>
            </a>
          </div>

          <div className="right">
            <a href="#" className="d-flex">
              <i className="fa-solid fa-file-excel"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
