function FooterGuess() {
  return (
    <>
      <div className="div-footer">
        <div className="a row">
          <div
            className="a col-lg-3 col-md-6 col-sm-6"
            style={{ padding: "12px" }}
          >
            <div className="footer-tittle">
              <div style={{ fontSize: "14px", textTransform: "uppercase" }}>
                giới thiệu
              </div>
              <div className="padding-top-12px">
                <div className="padding-top-12px text-decoration-underline">
                  Hệ thống
                </div>
                <div className="padding-top-12px text-decoration-underline">
                  Tài trợ
                </div>
              </div>
            </div>
          </div>
          <div
            className="a col-lg-3 col-md-6 col-sm-6"
            style={{ padding: "12px" }}
          >
            <div className="footer-tittle">
              <div style={{ fontSize: "14px", textTransform: "uppercase" }}>
                thông tin - hướng dẫn
              </div>
              <div className="padding-top-12px">
                <div className="padding-top-12px text-decoration-underline">
                  Tin tức
                </div>
                <div className="padding-top-12px text-decoration-underline">
                  Tài liệu hướng dẫn tra cứu thông tin
                </div>
                <div className="padding-top-12px text-decoration-underline">
                  Video hướng dẫn tra cứu thông tin
                </div>
              </div>
            </div>
          </div>
          <div
            className="a col-lg-3 col-md-6 col-sm-6"
            style={{ padding: "12px" }}
          >
            <div className="footer-tittle">
              <div style={{ fontSize: "14px", textTransform: "uppercase" }}>
                văn bản - tài liệu
              </div>
              <div className="padding-top-12px">
                <div className="padding-top-12px text-decoration-underline">
                  Văn bản pháp luật
                </div>
              </div>
            </div>
          </div>
          <div
            className="a col-lg-3 col-md-6 col-sm-6"
            style={{ padding: "12px" }}
          >
            <div className="footer-tittle">
              <div style={{ fontSize: "14px", textTransform: "uppercase" }}>
                hỗ trợ
              </div>
              <div className="padding-top-12px">
                <div className="padding-top-12px text-decoration-underline">
                  Liên hệ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second-footer">
        <div className="a pt-2">
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO
          VỆ
        </div>
        <div style={{ paddingTop: "4px" }}>
          <span style={{marginRight: '32px'}} className="a text-decoration-underline">Điều khoản & Bảo mật</span>
          <span>Bản quyền bởi Ban quản lý dự án WLP</span>
        </div>
        <div className="a pt-2">
          Được tài trợ bởi: Quỹ môi trường dự án toàn cầu (GEF) THÔNG QUA NGÂN
          HÀNG THẾ GIỚI (WB)
        </div>
      </div>
    </>
  );
}

export default FooterGuess;
