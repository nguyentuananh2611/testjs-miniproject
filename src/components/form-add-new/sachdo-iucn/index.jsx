import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authDanhMuc, getDanhMucAction } from "../../../store/auth";
import SachDoIucnTable from "./table";
function SachDoIUCN(props) {
  let { inputValue, postData, setPostData } = props;
  let { sach_dos, iucns } = inputValue;
  const dispatch = useDispatch();
  const danh_muc = useSelector(authDanhMuc);
  useEffect(() => {
    async function fetchDanhMuc() {
      await dispatch(getDanhMucAction());
    }
    fetchDanhMuc();
  }, [dispatch]);
  const dataSachDo = useMemo(() => {
    if (danh_muc) {
      return danh_muc[0];
    }
  }, [danh_muc]);

  const dataIucn = useMemo(() => {
    if (danh_muc) {
      return danh_muc[1];
    }
  }, [danh_muc]);
  return (
    <>
      <div className="a mt-4">
        <h3>III. Tình trạng bảo tồn</h3>
        <div className="row">
          <SachDoIucnTable
            tiltle={`Sách đỏ`}
            dataDanhMuc={dataSachDo}
            _danhMuc={sach_dos}
            postData={postData}
            setPostData={setPostData}
            danhMucs={`sach_dos`}
          />
          <SachDoIucnTable
            tiltle={`IUCN`}
            dataDanhMuc={dataIucn}
            _danhMuc={iucns}
            postData={postData}
            setPostData={setPostData}
            danhMucs={`iucns`}
          />
        </div>
      </div>
    </>
  );
}

export default SachDoIUCN;
