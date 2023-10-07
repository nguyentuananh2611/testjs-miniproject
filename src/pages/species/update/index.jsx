import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSpeciesId } from "../../../store/auth";
import HeaderOnly from "../../../components/headerOnly";
import Sidebar from "../sidebar";
import AddNewContent from "../add-new/add-new-content";
import { putDataSpeciesAction, getSpeciesIdAction } from "../../../store/auth";
import { useParams, useNavigate } from "react-router-dom";
function UpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function fetchSpeciesId(id) {
      await dispatch(getSpeciesIdAction(id));
    }
    fetchSpeciesId(id);
  }, [dispatch, id]);
  const speciesId = useSelector(authSpeciesId);
  const handleAddAndUpdate = async (updateData) => {
    const resultAction = await dispatch(putDataSpeciesAction(updateData));
    if (putDataSpeciesAction.rejected.match(resultAction)) {
      const errorMessage = resultAction.error.message;
      alert(errorMessage);
    } else {
      navigate("/species");
      window.location.reload();
    }
  };

  const inputValue1 = useMemo(() => {
    if (speciesId && speciesId) {
      let inputValue = {};
      inputValue.id = speciesId.id;
      inputValue.ten = speciesId.ten;
      inputValue.ten_khoa_hoc = speciesId.ten_khoa_hoc;
      inputValue.ten_tac_gia = speciesId.ten_tac_gia;
      inputValue.ten_dia_phuong = speciesId.ten_dia_phuong;
      inputValue.nguon_du_lieu = speciesId.nguon_du_lieu;
      inputValue.kingdom_id = `${speciesId.kingdom_id}_kingdom`;
      inputValue.phylum_id = `${speciesId.phylum_id}_phylum`;
      inputValue.class_id = `${speciesId.class_id}_class`;
      inputValue.order_id = `${speciesId.order_id}_order`;
      inputValue.family_id = `${speciesId.family_id}_family`;
      inputValue.genus_id = `${speciesId.genus_id}_genus`;
      inputValue.kingdom_innerText = speciesId.kingdom.ten
        ? `${speciesId.kingdom.ten_khoa_hoc}-${speciesId.kingdom.ten}`
        : `${speciesId.kingdom.ten_khoa_hoc}`;
      inputValue.phylum_innerText = speciesId.phylumn.ten
        ? `${speciesId.phylumn.ten_khoa_hoc}-${speciesId.phylumn.ten}`
        : `${speciesId.phylumn.ten_khoa_hoc}`;
      inputValue.class_innerText = speciesId.class.ten
        ? `${speciesId.class.ten_khoa_hoc}-${speciesId.class.ten}`
        : `${speciesId.class.ten_khoa_hoc}`;
      inputValue.order_innerText = speciesId.order.ten
        ? `${speciesId.order.ten_khoa_hoc}-${speciesId.order.ten}`
        : `${speciesId.order.ten_khoa_hoc}`;
      inputValue.family_innerText = speciesId.family.ten
        ? `${speciesId.family.ten_khoa_hoc}-${speciesId.family.ten}`
        : `${speciesId.family.ten_khoa_hoc}`;
      inputValue.genus_innerText = speciesId.genus.ten
        ? `${speciesId.genus.ten_khoa_hoc}-${speciesId.genus.ten}`
        : `${speciesId.genus.ten_khoa_hoc}`;
      inputValue.kingdomId = speciesId.kingdom_id;
      inputValue.phylumId = speciesId.phylum_id;
      inputValue.classId = speciesId.class_id;
      inputValue.orderId = speciesId.order_id;
      inputValue.familyId = speciesId.family_id;
      inputValue.genusId = speciesId.genus_id;
      inputValue.sach_dos = speciesId.sach_dos;
      inputValue.iucns = speciesId.iucns;
      return inputValue;
    }
  }, [speciesId]);
  let update = "Cập nhật";
  console.log(inputValue1);
  return (
    <>
      <div className="fill-height">
        <HeaderOnly />
        <Sidebar />
        {inputValue1 && (
          <AddNewContent
            inputValue={inputValue1}
            crul={update}
            addAndUpdate={handleAddAndUpdate}
          />
        )}
      </div>
    </>
  );
}

export default UpdatePage;
