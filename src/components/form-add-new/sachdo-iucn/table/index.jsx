import { useState, useRef, useEffect } from "react";
function SachDoIucnTable(props) {
  let { tiltle, dataDanhMuc, _danhMuc, postData, setPostData, danhMucs } =
    props;
  const _date = new Date();
  const currentYear = _date.getFullYear();
  let abc = "";
  function emptyArray(arr) {
    return arr.length !== 0;
  }

  const [danh_mucs, setDanh_mucs] = useState(() => {
    let arr = [];
    if (emptyArray(_danhMuc)) {
      arr = _danhMuc.map((item) => ({
        nam: item.pivot.nam,
        id: item.id,
        name: `${item.ma_danh_muc}-${item.ten}`,
      }));
    }
    return arr;
  });

  const arrYear = [];
  for (let i = currentYear; i >= 1990; i--) {
    arrYear.push(i);
  }
  const [on, setOn] = useState(false);
  const inputYearRef = useRef();
  const handleCreateElement = (e) => {
    let obj = {
      nam: currentYear,
      id: 0,
      name: "",
    };
    const updatedElements = [...danh_mucs];
    updatedElements.push(obj);
    setDanh_mucs(updatedElements);
  };

  const handleDeleteElement = (index) => {
    const updatedElements = [...danh_mucs];
    updatedElements.splice(index, 1);
    setDanh_mucs(updatedElements);
  };

  const handleActiveMenuChildYear = (e) => {
    e.preventDefault();
    setOn(true);
    setYear(parseInt(e.target.value));
  };

  const [nameId, setNameId] = useState(0);
  const [year, setYear] = useState(currentYear);
  const handleChangevalueYear = (e) => {
    e.preventDefault();
    const updatedElements = [...danh_mucs];
    const objectToUpdate = updatedElements.find((obj) => obj.nam === year);
    if (objectToUpdate) {
      objectToUpdate.nam = parseInt(e.target.name);
    }
    setDanh_mucs(updatedElements);
  };
  const [turn, setTurn] = useState(false);
  const inputHienTrangref = useRef();

  const handleClickOutside = (event) => {
    if (inputYearRef.current && !inputYearRef.current.contains(event.target)) {
      setOn(false);
    }
    if (
      inputHienTrangref.current &&
      !inputHienTrangref.current.contains(event.target)
    ) {
      setTurn(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleActiveMenuChildHienTrang = (e) => {
    e.preventDefault();
    setTurn(true);
    setNameId(parseInt(e.target.name));
  };

  const handleChangeValueHienTrang = (e) => {
    e.preventDefault();
    const updatedElements = [...danh_mucs];
    const objectToUpdate = updatedElements.find((obj) => obj.id === nameId);
    if (objectToUpdate) {
      objectToUpdate.name = e.target.name;
      objectToUpdate.id = parseInt(e.target.id);
    }
    setDanh_mucs(updatedElements);
  };

  useEffect(() => {
    const updatedPostData = { ...postData };
    delete updatedPostData[danhMucs];
    setPostData({ ...updatedPostData, [danhMucs]: danh_mucs });
  }, [danh_mucs]);
  return (
    <>
      <div className="a col col-6 pa-3 position-relative">
        <div>
          <div>
            <h3 className="pl-3">{tiltle}</h3>
          </div>
        </div>
        <div
          style={{
            lineHeight: "1.5",
            backgroundColor: "#fff",
            color: "rgba(0,0,0,.87)",
          }}
        >
          <table className="iii-table">
            <thead>
              <tr>
                <th>Năm</th>
                <th>Hiện trạng</th>
                <th>{abc}</th>
              </tr>
            </thead>
            <tbody id="T-body">
              {danh_mucs &&
                danh_mucs.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td ref={inputYearRef}>
                          <div
                            style={{
                              padding: "4px 8px",
                              height: "40px",
                              alignItems: "center",
                              border: "1px solid #ccc",
                            }}
                            className="a d-flex"
                          >
                            <div
                              style={{
                                width: "80%",
                                fontWeight: "bold",
                                opacity: "0.9",
                              }}
                            >
                              <input
                                className="input-year-hien-trang"
                                value={item.nam}
                                onClick={handleActiveMenuChildYear}
                                name={item.id}
                              />
                            </div>
                            <div
                              style={{ width: "20%", alignItems: "center" }}
                              className="a d-flex justify-content-center"
                            >
                              <i
                                style={{ opacity: "0.5" }}
                                className="fa-solid fa-caret-down"
                              ></i>
                            </div>
                          </div>
                        </td>
                        <td ref={inputHienTrangref}>
                          <div
                            style={{
                              padding: "4px 8px",
                              height: "40px",
                              alignItems: "center",
                              border: "1px solid #ccc",
                            }}
                            className="a d-flex"
                          >
                            <div
                              style={{
                                width: "80%",
                                fontWeight: "bold",
                                opacity: "0.9",
                              }}
                            >
                              <input
                                className="input-year-hien-trang"
                                value={item.name}
                                onClick={handleActiveMenuChildHienTrang}
                                name={item.id}
                              />
                            </div>
                            <div
                              style={{ width: "20%", alignItems: "center" }}
                              className="a d-flex justify-content-center"
                            >
                              <i
                                style={{ opacity: "0.5" }}
                                className="fa-solid fa-caret-down"
                              ></i>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteElement(index);
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="div-plus">
            <button
              type="button"
              onClick={handleCreateElement}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <ul
          className={`a position-absolute table-menuChild-year ${
            on ? "active" : ""
          }`}
        >
          {arrYear.map((item, index) => {
            return (
              <li key={index} className={`${year === item ? "activeLi" : ""}`}>
                <a href={abc} name={item} onClick={handleChangevalueYear}>
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
        <ul
          className={`a position-absolute table-menuChild-hienTrang ${
            turn ? "active" : ""
          }`}
        >
          {dataDanhMuc &&
            dataDanhMuc.childs.map((items) => {
              return (
                <li
                  key={items.id}
                  className={`${nameId === items.id ? "activeLi" : ""}`}
                >
                  <a
                    id={items.id}
                    href={abc}
                    name={`${items.ma_danh_muc}-${items.ten}`}
                    onClick={handleChangeValueHienTrang}
                  >
                    {items.ma_danh_muc}-{items.ten}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default SachDoIucnTable;
