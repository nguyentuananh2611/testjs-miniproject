import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authUser } from "../../store/auth";
import axios from "axios";
function HeaderSearch(props) {
  const { filter, setFilter } = props;
  const [on, setOn] = useState(false);
  const [data, setData] = useState({ list: [], pagination: {} });
  const [value, setValue] = useState("");
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
  function isEmptyArray(arr) {
    return arr.length === 0;
  }
  const handleSearch = (e) => {
    setOn(true);
    axios
      .get(
        `
    https://wlp.howizbiz.com/api/loaicongbo`,
        { params: { ...filter, search: e.target.value, perpage: 5 } }
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setValue(e.target.value);
    if (e.target.value === "") {
      setOn(false);
    }
    if (isEmptyArray(data.list)) {
      setOn(false);
    }
  };

  let _content = null;
  if (data) {
    _content = data.list.map((item, index) => {
      return (
        <>
          <div className="search-ket-qua" key={index}>
            <div
              className="full-height d-flex align__center"
              style={{ height: "40px" }}
            >
              <Link
                id={item.id}
                to={`/species/${item.id}`}
                href={abc}
                style={{ color: "#000", fontWeight: "600" }}
                name={item.ten}
              >
                {item.ten}
              </Link>
            </div>
          </div>
        </>
      );
    });
  }
  const handleSearchKetQuaKhac = (e) => {
    e.preventDefault();
    setFilter({ ...filter, search: value });
  };

  const handleButtonKetQuaKhac = (e) => {
    e.preventDefault();
    setFilter({ ...filter, search: value });
  };
  return (
    <>
      <div className="header-top align__center d-flex justify-content-end">
        <div className="padding-right-64px d-flex align__center header-a">
          {content}
        </div>
      </div>
      <div className="second-header d-flex">
        <div className="logo d-flex">
          <img
            src="http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"
            alt="logo"
          />
          <div className="inputDiv d-flex" ref={divRef}>
            <div className="inputControl position-relative">
              <input placeholder="Tìm kiếm" onChange={handleSearch} />
              <div
                className={`inputConTrolMenuChild position-absolute v-menu  ${
                  on ? "active" : ""
                }`}
              >
                <div style={{ padding: "8px 0" }}>
                  {_content}
                  <div className="search-ket-qua">
                    <div
                      className="full-height d-flex align__center"
                      style={{ height: "40px" }}
                    >
                      <a
                        href={abc}
                        className="a text-decoration-underline"
                        style={{ color: "#000", fontWeight: "600" }}
                        onClick={handleSearchKetQuaKhac}
                      >
                        Xem thêm kết quả khác
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex btn_search">
              <button type="button" onClick={handleButtonKetQuaKhac}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="divText d-flex">
              <span>Nâng cao</span>
            </div>
          </div>
        </div>

        <div className="container-button d-flex">
          <a href={abc}>
            <span>Bản tin</span>
          </a>
          <a href={abc}>
            <span>Giới thiệu</span>
          </a>
          <a href={abc}>
            <span>Tài liệu</span>
          </a>
          <a href={abc} style={{ backgroundColor: "#FCC275" }}>
            <span style={{ color: "black" }}>Liên hệ</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default HeaderSearch;
