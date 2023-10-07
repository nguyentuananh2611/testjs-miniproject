import PhanLoaiHoc from "./phanloaihoc";
function Sidebar(props) {
  const { filter, setFilter } = props;
  return (
    <>
      <div className="sideBar">
        <div className="full-height">
          <div>
            <div className="textLoai">
              Loại{" "}
              <span style={{ marginLeft: "5px" }}>
                <i className="fa-solid fa-circle-question"></i>
              </span>
            </div>
            <div className="breakLine"></div>
          </div>
          <div className="div-input-wrap">
            <div className="div-input">
              <input type="checkbox" value="loaicongbo" />
              <label>Loài</label>
            </div>
            <div className="div-input">
              <input type="checkbox" />
              <label>Văn bản tài liệu</label>
            </div>
          </div>
          <br />
          <div>
            <div className="textLoai">
              Bộ lọc
              <span style={{ marginLeft: "5px" }}>
                <i className="fa-solid fa-circle-question"></i>
              </span>
            </div>
            <div className="breakLine"></div>
          </div>
          <div>
            <PhanLoaiHoc filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
