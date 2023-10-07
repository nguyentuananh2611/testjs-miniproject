import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderSearch from "./header-search";
import FooterGuess from "../../components/footerGuess";
function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://wlp.howizbiz.com/api/species/${id}`)
      .then((res) => setData(res.data));
  }, [id]);
  const attachments = data && data.attachments ? data.attachments : [];
  return (
    <>
      <div className="fill-height">
        <HeaderSearch />
        <div className="thong-tin-chi-tiet">
          Thông tin chi tiết loài nguy cấp quý hiếm
        </div>
        <div className="a pa-8">
          <div className="a row">
            <div
              style={{ padding: "12px" }}
              className="a col-sm-8 col-md-4 col-lg-3 col-xl-3 col-12"
            >
              <div className="full-width" style={{ aspectRatio: "1/1" }}>
                <img
                  alt="avatar"
                  className="full-width full-height"
                  style={{ objectFit: "cover" }}
                  src={
                    attachments.length > 0
                      ? `http://wlp.howizbiz.com${attachments[0].path}`
                      : `https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png`
                  }
                />
              </div>
            </div>
            <div className="pl-6 col-sm-12 col-md-8 col-lg-9 col-xl-9 col-12 pr-3 pt-3 pb-3">
              <div className="a d-flex justify-content-between">
                <div className="wrap-chi-tiet">
                  <div className="species-name">{data.ten}</div>
                  <div style={{ marginBottom: "4px", fontSize: "18px" }}>
                    {data.ten_dia_phuong}
                  </div>
                  <hr style={{ margin: "0" }} />
                  <div style={{ fontSize: "16px", margin: "12px" }}>
                    {data.nguon_du_lieu}
                  </div>
                  <div className="div-phan-cach"></div>
                </div>
                <div></div>
              </div>
              <div className="species-ten_khoa-hoc">{data.ten_khoa_hoc}</div>
              <hr style={{ margin: "0" }} />
              <div className="div-dac_diem_nhan_dang">đặc điểm nhận dạng</div>
            </div>
          </div>
        </div>
        <FooterGuess />
      </div>
    </>
  );
}

export default DetailPage;
