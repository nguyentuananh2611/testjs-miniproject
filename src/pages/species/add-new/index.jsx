import { useDispatch, useSelector } from "react-redux";
import HeaderOnly from "../../../components/headerOnly";
import Sidebar from "../sidebar";
import AddNewContent from "./add-new-content";
import { addSpeciesAction } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
function AddNewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let inputValue = {
    id: "",
    ten: "",
    ten_khoa_hoc: "",
    ten_tac_gia: "",
    ten_dia_phuong: "",
    nguon_du_lieu: "",
    kingdom_id: "",
    phylum_id: "",
    class_id: "",
    order_id: "",
    family_id: "",
    genus_id: "",
    kingdom_innerText: "",
    phylum_innerText: "",
    class_innerText: "",
    order_innerText: "",
    family_innerText: "",
    genus_innerText: "",
    kingdomId: "",
    phylumId: "",
    classId: "",
    orderId: "",
    familyId: "",
    genusId: "",
    sach_dos: [],
    iucns: [],
  };
  let add_new = "Thêm mới";
  const handleAddAndUpdate = async (data) => {
    const resultAction = await dispatch(addSpeciesAction(data));
    if (addSpeciesAction.rejected.match(resultAction)) {
      const errorMessage = resultAction.error.message;
      alert(errorMessage);
    } else {
      navigate("/species");
    }
  };
  return (
    <>
      <div className="fill-height">
        <HeaderOnly />
        <Sidebar />
        <AddNewContent
          inputValue={inputValue}
          crul={add_new}
          addAndUpdate={handleAddAndUpdate}
        />
      </div>
    </>
  );
}

export default AddNewPage;
