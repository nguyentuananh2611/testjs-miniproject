import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRankAction, authRank } from "../../store/auth";
import InputRank from "./input-rank";
import InputNames from "./input-names";
import SachDoIUCN from "./sachdo-iucn";
function FormAU(props) {
  let { inputValue, crul, addAndUpdate } = props;
  const [valueInput, setValueInput] = useState(inputValue);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    toa_dos: [],
    kingdom_id: inputValue.kingdomId,
    phylum_id: inputValue.phylumId,
    class_id: inputValue.classId,
    order_id: inputValue.orderId,
    family_id: inputValue.familyId,
    genus_id: inputValue.genusId,
    ten: inputValue.ten,
    ten_khoa_hoc: inputValue.ten_khoa_hoc,
    sach_dos: inputValue.sach_dos,
    iucns: inputValue.iucns,
  });
  console.log(postData);
  const [kingId, setKingId] = useState(null);
  const [phylumId, setPhylumId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [familyId, setFamilyId] = useState(null);
  const [genusId, setGenusId] = useState(null);
  const [validate, setValidate] = useState({
    ten: inputValue.ten,
    ten_khoa_hoc: inputValue.ten_khoa_hoc,
    kingdom: inputValue.kingdom_id,
    phylum: inputValue.phylum_id,
    class: inputValue.class_id,
    order: inputValue.order_id,
    family: inputValue.family_id,
    genus: inputValue.genus_id,
  });

  const [error, setError] = useState({});
  useEffect(() => {
    async function fetchRank() {
      await dispatch(getRankAction());
    }
    fetchRank();
  }, [dispatch]);
  const dataRank = useSelector(authRank);
  const _kingdom = [];
  const _phylum = [];
  const _class = [];
  const _order = [];
  const _family = [];
  const _genus = [];
  if (dataRank) {
    _kingdom.push(dataRank.filter((item) => item.rank_vn === "Giới"));
    if (kingId !== null) {
      _phylum.push(
        dataRank.filter(
          (item) => item.rank_vn === "Ngành" && item.parent_id === kingId
        )
      );
    } else {
      _phylum.push(dataRank.filter((item) => item.rank_vn === "Ngành"));
    }

    if (phylumId !== null) {
      _class.push(
        dataRank.filter(
          (item) => item.rank_vn === "Lớp" && item.parent_id === phylumId
        )
      );
    } else {
      _class.push(dataRank.filter((item) => item.rank_vn === "Lớp"));
    }
    if (classId !== null) {
      _order.push(
        dataRank.filter(
          (item) => item.rank_vn === "Bộ" && item.parent_id === classId
        )
      );
    } else {
      _order.push(dataRank.filter((item) => item.rank_vn === "Bộ"));
    }
    if (orderId !== null) {
      _family.push(
        dataRank.filter(
          (item) => item.rank_vn === "Họ" && item.parent_id === orderId
        )
      );
    } else {
      _family.push(dataRank.filter((item) => item.rank_vn === "Họ"));
    }
    if (familyId !== null) {
      _genus.push(
        dataRank.filter(
          (item) => item.rank_vn === "Chi" && item.parent_id === familyId
        )
      );
    } else {
      _genus.push(dataRank.filter((item) => item.rank_vn === "Chi"));
    }
  }

  const isValidate = (data) => {
    let error = {};
    if (data.ten === "") {
      error.exist = true;
      error.ten = "Trường tên không được bỏ trống.";
    }

    if (!data.ten_khoa_hoc) {
      error.exist = true;
      error.ten_khoa_hoc = "Trường tên khoa học không được bỏ trống.";
    }
    if (!data.kingdom) {
      error.exist = true;
      error.kingdom = "Trường giới không được bỏ trống.";
    }
    if (!data.phylum) {
      error.exist = true;
      error.phylum = "Trường ngành không được bỏ trống.";
    }
    if (!data.class) {
      error.exist = true;
      error.class = "Trường lớp không được bỏ trống.";
    }
    if (!data.order) {
      error.exist = true;
      error.order = "Trường bộ không được bỏ trống.";
    }
    if (!data.family) {
      error.exist = true;
      error.family = "Trường họ không được bỏ trống.";
    }
    if (!data.genus) {
      error.exist = true;
      error.genus = "Trường chi không được bỏ trống.";
    }
    setError(error);
    return !error.exist;
  };

  const handleAddNew = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(postData);
      let is_validate = isValidate(validate);
      if (is_validate) {
        await addAndUpdate(postData);
      } else {
      }
    },
    [postData, validate, addAndUpdate]
  );
  return (
    <>
      <form className="au-form">
        <div>
          <h3>I. Thông tin chung về loài</h3>
          <div className="a row">
            <div className="a col col-9">
              <div className="a row">
                <div className="a col col-12 pa-3">
                  <div className="tieu-de">
                    Tên <span style={{ color: "red" }}>*</span>
                  </div>
                  <InputNames
                    postData={postData}
                    setPostData={setPostData}
                    placeholder={`Tên`}
                    is_name={`ten`}
                    validate={validate}
                    setValidate={setValidate}
                    valueInput={valueInput}
                    setValueInput={setValueInput}
                  />
                  {error.ten !== "" && (
                    <div style={{ color: "red" }}>{error.ten}</div>
                  )}
                </div>
                <div className="a col col-6 pa-3">
                  <div className="tieu-de">
                    Tên khoa học <span style={{ color: "red" }}>*</span>
                  </div>
                  <InputNames
                    postData={postData}
                    setPostData={setPostData}
                    placeholder={`Tên khoa học`}
                    is_name={`ten_khoa_hoc`}
                    validate={validate}
                    setValidate={setValidate}
                    valueInput={valueInput}
                    setValueInput={setValueInput}
                  />
                  {error.ten_khoa_hoc !== "" && (
                    <div style={{ color: "red" }}>{error.ten_khoa_hoc}</div>
                  )}
                </div>
                <div className="a col col-6 pa-3">
                  <div className="tieu-de">Tên tác giả</div>
                  <InputNames
                    postData={postData}
                    setPostData={setPostData}
                    placeholder={`Tên tác giả`}
                    is_name={`ten_tac_gia`}
                    validate={validate}
                    setValidate={setValidate}
                    valueInput={valueInput}
                    setValueInput={setValueInput}
                  />
                </div>
                <div className="a col col-12 pa-3">
                  <div className="tieu-de">Tên địa phương</div>

                  <InputNames
                    postData={postData}
                    setPostData={setPostData}
                    placeholder={`Tên địa phương`}
                    is_name={`ten_dia_phuong`}
                    validate={validate}
                    setValidate={setValidate}
                    valueInput={valueInput}
                    setValueInput={setValueInput}
                  />
                </div>
                <div className="a col col-12 pa-3">
                  <div className="tieu-de">Nguồn dữ liệu</div>
                  <InputNames
                    postData={postData}
                    setPostData={setPostData}
                    placeholder={`Nguồn dữ liệu`}
                    is_name={`nguon_du_lieu`}
                    validate={validate}
                    setValidate={setValidate}
                    valueInput={valueInput}
                    setValueInput={setValueInput}
                  />
                </div>
              </div>
            </div>
            <div className="a col col-3 pl-3 pr-3">
              <div className="pl-6 pb-3" style={{ lineHeight: "100%" }}>
                <div className="tieu-de pt-3"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="a mt-4">
          <div className="a d-flex" style={{ alignItems: "center" }}>
            <h3 className="mr-3">II. Phân loại học</h3>
            <div className="add-new">
              <button>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="a row">
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Giới`}
                rank={_kingdom[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`kingdom_id`}
                nameId={kingId}
                setNameId={setKingId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`kingdom_innerText`}
              />
              {error.kingdom !== "" && (
                <div style={{ color: "red" }}>{error.kingdom}</div>
              )}
            </div>
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Ngành`}
                rank={_phylum[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`phylum_id`}
                nameId={phylumId}
                setNameId={setPhylumId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`phylum_innerText`}
              />
              {error.phylum !== "" && (
                <div style={{ color: "red" }}>{error.phylum}</div>
              )}
            </div>
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Lớp`}
                rank={_class[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`class_id`}
                nameId={classId}
                setNameId={setClassId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`class_innerText`}
              />
              {error.class !== "" && (
                <div style={{ color: "red" }}>{error.class}</div>
              )}
            </div>
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Bộ`}
                rank={_order[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`order_id`}
                nameId={orderId}
                setNameId={setOrderId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`order_innerText`}
              />
              {error.order !== "" && (
                <div style={{ color: "red" }}>{error.order}</div>
              )}
            </div>
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Họ`}
                rank={_family[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`family_id`}
                nameId={familyId}
                setNameId={setFamilyId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`family_innerText`}
              />
              {error.family !== "" && (
                <div style={{ color: "red" }}>{error.family}</div>
              )}
            </div>
            <div className="a col col-4 pa-3 position-relative">
              <InputRank
                place={`Chi`}
                rank={_genus[0]}
                postData={postData}
                setPostData={setPostData}
                name_id={`genus_id`}
                nameId={genusId}
                setNameId={setGenusId}
                validate={validate}
                setValidate={setValidate}
                valueInput={valueInput}
                setValueInput={setValueInput}
                name_innerText={`genus_innerText`}
              />
              {error.genus !== "" && (
                <div style={{ color: "red" }}>{error.genus}</div>
              )}
            </div>
          </div>
        </div>

        <SachDoIUCN
          inputValue={inputValue}
          postData={postData}
          setPostData={setPostData}
        />

        <div className="a mt-4">
          <div className="row">
            <div className="a col col-12 pa-3">
              <div
                style={{ height: "40px", width: "100%" }}
                className="a d-flex justify-content-end"
              >
                <button
                  type="button"
                  className="button-add-new d-flex"
                  style={{ width: "160px" }}
                  onClick={handleAddNew}
                >
                  <span>
                    <i className="fa-solid fa-plus"></i>
                    <span>{crul}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormAU;
