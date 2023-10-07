import { useNavigate } from "react-router-dom";
import FormAU from "../../../components/form-add-new";
function AddNewContent(props) {
  const navigate = useNavigate();
  const handleChagePageSpecies = (e) =>{
    e.preventDefault();
    navigate('/species');
  }
  let { inputValue, crul, addAndUpdate } = props;
  return (
    <>
      <div className="main">
        <div className="main-add-new-wrap fillHeight">
          <div className="add-new-tittle d-flex">
            <div className="margin-right-16">
              <button className="d-inline-flex full-width" onClick={handleChagePageSpecies}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
            <div className="d-flex align-content-center">
              <h2>
                THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU
                TIÊN BẢO VỆ
              </h2>
            </div>
          </div>
          <FormAU inputValue={inputValue} crul={crul} addAndUpdate={addAndUpdate} />
        </div>
      </div>
    </>
  );
}

export default AddNewContent;
