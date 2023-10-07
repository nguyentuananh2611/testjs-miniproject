import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authUser } from "../../store/auth";
function HeaderGuess() {
  const [on, setOn] = useState(false);
  const user = useSelector(authUser);
  let content = null;
  if (user && user.id) {
    content = (
      <>
        <Link to="/species" className="d-inline-flex align__center">
          {user.name}
        </Link>
      </>
    );
  } else {
    content = (
      <>
        <Link to="/login" className="d-inline-flex align__center">
          Đăng nhập
        </Link>
      </>
    );
  }
  let abc = "";
  const handleMenuChildSearch = (e) => {
    setOn(true);
  };
  const divRef = useRef();
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOn(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <div className="header-top align__center d-flex justify-content-end">
        <div className="padding-right-64px d-flex align__center header-a">
          {content}
        </div>
      </div>

      <div className="second-header d-flex justify-content-between">
        <div className="a ps-4 d-flex align__center">
          <img
            src="https://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
            alt=""
            style={{ height: "80px" }}
          />
          <div className="header-tittle">
            <div>HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG</div>
            <div>LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</div>
          </div>
        </div>
        <div className="a pe-4 header-row-a">
          <a href={abc}>Bản tin</a>
          <a href={abc}>Giới thiệu</a>
          <a href={abc}>Tài liệu</a>
          <a href={abc} className="lien-he">
            Liên hệ
          </a>
        </div>
      </div>

      <div className="search-container d-flex align__center">
        <div className="search-items d-flex justify-content-center">
          <div
            className="search-bar d-flex"
            onClick={handleMenuChildSearch}
            style={{ cursor: "pointer" }}
            ref={divRef}
          >
            <div className="div-input position-relative">
              <input type="text" placeholder="Tìm kiếm" />
              <div
                className={`search-menuChild position-absolute v-menu ${
                  on ? "active" : ""
                }`}
              >
                <Link to="/search">
                  <i>Tìm kiếm thêm thông tin tại đây</i>
                </Link>
              </div>
            </div>
            <div className="div-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div style={{ width: "30px" }}></div>
          <div className="nang-cao d-flex align__center">
            <button type="button">Nâng cao</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderGuess;
