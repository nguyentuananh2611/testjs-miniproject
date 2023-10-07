import { useState, useEffect } from "react";
import axios from "axios";
function Content(props) {
  const { filter, setFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ list: [], pagination: {} });
  const [chuaXacDinh, setChuaXacDinh] = useState("Chưa xác định");
  useEffect(() => {
    axios
      .get(`https://wlp.howizbiz.com/api/loaicongbo`, { params: filter })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [filter]);
  console.log(data);

  const { list, pagination } = data;
  const total = pagination.total;
  let abc = "";
  const handleChangePage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    axios
      .get(`https://wlp.howizbiz.com/api/loaicongbo`, {
        params: { ...filter, page: currentPage + 1 },
      })
      .then((res) => {
        const newData = {
          list: [...data.list, ...res.data.list],
          pagination: res.data.pagination,
        };
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="div-main flex-column flex-grow-1">
        <div className="pa-4 pb-0">
          <h3>
            Kết quả <span>{total}</span>
          </h3>
        </div>
        <div className="div-main pa-4 flex-column flex-grow-1">
          <div className="a row">
            {list &&
              list.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="a col-md-4 col-sm-6 col-lg-4"
                    style={{ padding: "12px" }}
                  >
                    <div className="species-card">
                      <div className="pointer">
                        <div className="v-image">
                          <img
                            src={
                              items.attachments[0] && items.attachments[0].path
                                ? `http://wlp.howizbiz.com${items.attachments[0].path}`
                                : `https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png`
                            }
                            alt=""
                            className="full-height full-with"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
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
                              fontSize: "16px",
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
                              {items.loai_hien_trang &&
                              items.loai_hien_trang.ten
                                ? items.loai_hien_trang.ten
                                : chuaXacDinh}
                            </div>
                            <div className="full-height phan-hang">
                              <button
                                className="full-height d-inline-flex"
                                style={{ backgroundColor: "rgb(233,30,99)" }}
                              >
                                {items.sach_dos[0] &&
                                items.sach_dos[0].ma_danh_muc
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
              })}
          </div>
        </div>
        <div
          className="a d-flex justify-content-center"
          style={{ marginBottom: "20px" }}
        >
          <a
            href={abc}
            style={{ textDecoration: "underline", color: "#000" }}
            onClick={handleChangePage}
          >
            <i id="1" style={{ fontSize: "18px", color: "#000" }}>
              Xem thêm
            </i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Content;
