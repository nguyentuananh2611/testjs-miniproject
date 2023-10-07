import axios from "axios";
import { useEffect, useState } from "react";
function PhanLoaiHoc(props) {
  const { filter, setFilter } = props;
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  useEffect(() => {
    axios.get(`https://wlp.howizbiz.com/api/phanloaihoc/filter`).then((res) => {
      //   khởi tao tất cả các giá trị của isChecked đều là false
      const initialCheckedItems = new Array(res.data.data.length).fill(false);
      setIsChecked(initialCheckedItems);
      setData(res.data.data);
    });
  }, []);
  const handleRenderMenuChild = (e) => {
    e.preventDefault();
    setIsActive((isActive) => !isActive);
  };
  let abc = "";
  const handleChangeChecked = (e, index) => {
    let { id, name } = e.target;
    const updatedCheckedItems = [...isChecked];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    console.log(updatedCheckedItems);
    setIsChecked(updatedCheckedItems);
    const newFilter = updatedCheckedItems.reduce((acc, isChecked, idx) => {
      if (isChecked) {
        acc.push(data[idx].id);
      }
      return acc;
    }, []);

    setFilter({ ...filter, [name]: newFilter });
  };

  const handleRenderRankMenuChild = (data, id) => {
    setIsActive(!isActive);
    treeView(data);
  };

  const treeView = (data) => {
    let content = data.map((items, index) => {
      return (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="a d-flex"
          >
            <input
              type="checkbox"
              name="kingdom_ids[]"
              key={items.id}
              id={items.id}
              value={items.ten}
              checked={isChecked[index]}
              onChange={(e) => {
                handleChangeChecked(e, index);
              }}
            />
            <label style={{ fontWeight: "bold" }}>{items.ten}</label>
            <div
              onClick={() => {
                handleRenderRankMenuChild(items.childs, items.id);
              }}
              style={{ paddingLeft: "10px" }}
            >
              <i>{items.type}</i>
              <span style={{ paddingLeft: "5px", cursor: "pointer" }}>
                ({items.species_count})
              </span>
              <button
                className="a d-inline-block full-height"
                style={{ paddingLeft: "18px" }}
              >
                »
              </button>
            </div>
          </div>
        </>
      );
    });
    return content;
  };
  let kingdom = null;
  if (data) {
    kingdom = treeView(data);
  }

  return (
    <>
      <div
        className={`items ${isActive ? "_isActive" : ""}`}
        onClick={(e) => {
          handleRenderMenuChild(e);
        }}
      >
        <i
          style={{ marginRight: "10px" }}
          className="fa-solid fa-caret-right"
        ></i>
        <a href={abc}>Phân Loại Học</a>
        <div className="itemsChildren">{kingdom}</div>
      </div>
    </>
  );
}

export default PhanLoaiHoc;
