import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableSpecies from "./table";
function Main() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    paginate: true,
    page: 1,
    perpage: 10,
    search: "",
    inactive: -1,
  });
  const handleChangeInput = (e) => {
    let { value } = e.target;
    setFilter({ ...filter, search: value });
  };

  const handleChangePageThemMoi = async (e) => {
    e.preventDefault();
    return navigate("/species/add-new");
  };
  return (
    <>
      <main className="main">
        <div className="species-content">
          <div className="d-flex flex-column">
            <div className="flex-grow-0 p-bottom-20">
              <div className="d-block d-flex full-width full-height align-content-center">
                <div className="row align-content-center">
                  <div className="d-flex align-content-center">
                    <div className="species-avartar d-flex justify-content-center">
                      <i className="fa-solid fa-spider"></i>
                    </div>
                    <div className="species-tittle-page d-flex">
                      loài nguy cấp quý hiếm
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow-0 p-bottom-16">
              <div className="d-flex">
                <div className="flex-grow-1 d-flex">
                  <div className="flex-grow-1" style={{ maxWidth: "800px" }}>
                    <div className="v-input">
                      <div className="v-input_control d-flex">
                        <div className="v-input_icon">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="v-input_input">
                          <input
                            placeholder="Tìm kiếm theo tên"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-0">
                  <div className="p-left-8" style={{ width: "160px" }}>
                    <button
                      type="button"
                      className="button-add-new d-flex"
                      onClick={handleChangePageThemMoi}
                    >
                      <span>
                        <i className="fa-solid fa-plus"></i>
                        <span>Thêm mới</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <TableSpecies filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
