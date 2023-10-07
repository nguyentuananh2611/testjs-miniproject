import { useEffect, useState } from "react";
import axios from "axios";
function Content() {
  const [data, setData] = useState([]);
  const [chuaXacDinh, setChuaXacDinh] = useState("Chưa xác định");
  useEffect(() => {
    axios
      .get("https://wlp.howizbiz.com/api/loainoibat")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  let content = data.map((items, index) => {
    return (
      <div
        key={index}
        className="a col-md-4 col-sm-6 col-lg-3"
        style={{ padding: "12px" }}
      >
        <div className="species-card">
          <div className="pointer">
            <div
              className="v-image"
              style={{
                backgroundImage: `url(https://wlp.howizbiz.com/${items.attachments[0].path})`,
              }}
            ></div>
            <div className="thong-tin">
              <div
                style={{
                  fontSize: "14px",
                  color: "#080100",
                  fontWeight: "600",
                  padding: "12px 0 0 16px",
                }}
              >
                {items.kingdom.ten}-{items.phylumn.ten}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#080100",
                  fontWeight: "600",
                  padding: "4px 0 0 16px",
                }}
              >
                {items.ten}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#080100",
                  padding: "4px 0 0 16px",
                }}
              >
                <i>{items.ten_khoa_hoc}</i>
              </div>
            </div>
            <div className="v-card">
              <div className="card-footer d-flex justify-content-between">
                <div
                  className="align__center d-flex"
                  style={{
                    height: "36px",
                    fontSize: "14px",
                    padding: "0 0 0 8px",
                    fontWeight: "bold",
                  }}
                >
                  {items.loai_hien_trang && items.loai_hien_trang.ten
                    ? items.loai_hien_trang.ten
                    : chuaXacDinh}
                </div>
                <div className="full-height phan-hang">
                  <button
                    className="full-height d-inline-flex"
                    style={{ backgroundColor: "rgb(233,30,99)" }}
                  >
                    {items.sach_dos[0] && items.sach_dos[0].ma_danh_muc
                      ? items.sach_dos[0].ma_danh_muc
                      : "NE"}
                  </button>
                  <button
                    className="full-height d-inline-flex"
                    style={{ backgroundColor: "rgb(244,67,54)" }}
                  >
                    {items.iucns[0] && items.iucns[0].ma_danh_muc
                      ? items.iucns[0].ma_danh_muc
                      : "NE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="a p-4">
        <div className="content-tiltle">Loài nổi bật</div>
        <div className="a row">{content}</div>
      </div>
    </>
  );
}

export default Content;
