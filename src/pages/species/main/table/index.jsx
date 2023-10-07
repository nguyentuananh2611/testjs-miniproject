import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { authLoading } from "../../../../store/auth";
import {
  authSpecies,
  getSpeciesAction,
  getSpeciesIdAction,
  deleteSpeciesAction
} from "../../../../store/auth";
import Pagination from "../../../../components/pagination";
function TableSpecies(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(authLoading);
  let { filter, setFilter } = props;
  const [selectedValue, setSelectedValue] = useState(5);
  const filterString = queryString.stringify(filter);
  useEffect(() => {
    async function fetchSpecies() {
      await dispatch(getSpeciesAction(filterString));
    }
    fetchSpecies();
  }, [dispatch, filterString]);
  const species = useSelector(authSpecies);
  let content = null;
  let pagileft = "";
  let paginate = {};
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  if (species) {
    let { list, pagination } = species;
    let { page, itemsPerPage, total } = pagination;
    pagileft = `${page}-${itemsPerPage}/${total}`;
    let totalPage = Math.ceil(total / itemsPerPage);
    paginate.page = page;
    paginate.totalPage = totalPage;

    const handleChangeUpdate = async (e) => {
      e.preventDefault();
      // await dispatch(getSpeciesIdAction(e.target.id));
      return navigate(`chi-tiet/${e.target.id}`);
    };

    content = list.map((items) => {
      return (
        <>
          <tr>
            <td>
              <div className="d-flex pt-2 pb-2">
                <img
                  src={
                    items.attachments[0] && items.attachments[0].path
                      ? `http://wlp.howizbiz.com/${items.attachments[0].path}`
                      : "https://tse1.mm.bing.net/th?id=OIP.ur177AOTmiLkZ5AONgDBjgAAAA&pid=Api&P=0&w=300&h=300"
                  }
                  alt=""
                />
                <div className="d-flex td-name">{items.ten}</div>
              </div>
            </td>
            <td>{items.ten_khoa_hoc}</td>
            <td>{items.kingdom.ten}</td>
            <td>{items.phylumn.ten}</td>
            <td>{items.class.ten}</td>
            <td>{items.order.ten}</td>
            <td>{items.family.ten_khoa_hoc}</td>
            <td>{items.genus.ten_khoa_hoc}</td>
            <td>
              <div className="hanh-dong">
                <button onClick={handleChangeUpdate} disabled={loading}>
                  <i id={items.id} className="fa-solid fa-pen"></i>
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={()=>{setSelectedSpecies(items)}}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        </>
      );
    });
  }

  const handleSelectChangValue = (e) => {
    let { value } = e.target;
    setSelectedValue(value);
    setFilter({ ...filter, perpage: value });
  };

  const handleDeleteSpecies = async (e) => {
     await dispatch(deleteSpeciesAction(selectedSpecies.id));
     window.location.reload();
  };

  return (
    <>
      <div className="a d-flex flex-column flex-grow-1 overflow-hidden">
        <div className="flex-grow-1 full-width">
          <div className="pb-2">
            <div className="full-width overflow-hidden flex-grow-1">
              <div className="v-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <span>Tên</span>
                      </th>
                      <th>
                        <span>Tên khoa học</span>
                      </th>
                      <th>
                        <span>Giới</span>
                      </th>
                      <th>
                        <span>Nghành</span>
                      </th>
                      <th>
                        <span>Lớp</span>
                      </th>
                      <th>
                        <span>Bộ</span>
                      </th>
                      <th>
                        <span>Họ</span>
                      </th>
                      <th>
                        <span>Chi</span>
                      </th>
                      <th>
                        <span>
                          <span>Hành động</span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ height: "408px", zIndex: "-5", position: "" }}
                  >
                    {content}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className="flex-grow-0 pt-2 d-block"
              style={{ marginTop: "0" }}
            >
              <div className="a d-flex align__center justify-content-between">
                <div className="pagi-left">{pagileft}</div>
                <div className="align__center">
                  <Pagination
                    paginate={paginate}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </div>
                <div className="pagi-right">
                  <select
                    defaultValue={selectedValue}
                    onChange={handleSelectChangValue}
                  >
                    <option value="10">10 / trang</option>
                    <option value="15">15 / trang</option>
                    <option value="20">20 / trang</option>
                    <option value="25">25 / trang</option>
                    <option value="50">50 / trang</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="deleteModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header delete" style={{backgroundColor: 'red'}}>
              <h4 className="modal-title" style={{color: '#fff'}}>Bạn có chắc chắn không?</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal body */}
            <div className="modal-body" id="body-delete">
              Bạn có chắc muốn xóa{" "}
              <b style={{ color: "#da2a1a" }}>
                {selectedSpecies && selectedSpecies.ten}
              </b>{" "}
              ? Điều này hoàn toàn không thế hoàn tác!
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-danger"
                id="delete"
                data-bs-dismiss="modal"
                onClick={handleDeleteSpecies}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableSpecies;
