import { useState, useRef, useEffect } from "react";
function InputRank(props) {
  const {
    place,
    rank,
    postData,
    setPostData,
    name_id,
    nameId,
    setNameId,
    validate,
    setValidate,
    valueInput,
    setValueInput,
    name_innerText,
  } = props;
  const [on, setOn] = useState(false);
  // const [valueSelect, setValueSelect] = useState(valueInput[name_id]);
  // console.log(valueSelect);
  const [value, setValue] = useState(valueInput[name_innerText]);
  const inputRef = useRef(null);
  // const handleChangeValueSelect = async (e) => {
  //   let { value } = e.target;
  //   let option = document.getElementById(value);
  //   setNameId(parseInt(option.role));
  //   const intKytuDauTien = parseInt(value.split("_")[0]);
  //   const intKytuSau = value.split("_")[1].toLowerCase();
  //   setValueSelect(value);
  //   setValidate({ ...validate, [intKytuSau]: value });
  //   setPostData({ ...postData, [name_id]: intKytuDauTien });
  // };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOn(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  let abc = "";
  const handleClose = (e) => {
    e.preventDefault();
    setValue("");
    setOn(false);
  };
  const handleChangeValue = (e) => {
    e.preventDefault();
    let { name, id, role } = e.target;
    console.log(role);
    setValue(name);
    setNameId(parseInt(id));
    setPostData({ ...postData, [name_id]: parseInt(role.split("_")[0]) });
    setValidate({
      ...validate,
      [role.split("_")[1].toLowerCase()]: role,
    });
  };
  // const handleChangeInput = (e) => {
  //   const targetLink = handleChangeValue();
  //   console.log(targetLink);
  // };
  return (
    <>
      <div className="tieu-de">
        <span>{place}</span> <span style={{ color: "red" }}>*</span>
      </div>
      {/* <div
        className={`div-form-input d-flex justify-content-between position-relative ${
          on ? "border-red" : ""
        }`}
        style={{ padding: "0 12px" }}
        ref={selectRef}
      >
        <select
          placeholder={place}
          value={valueSelect}
          className="full-width"
          onChange={handleChangeValueSelect}
          onClick={() => {
            setOn(true);
          }}
        >
          <option className={`${on ? "v-menu" : ""}`}>
            {valueInput[name_innerText]}
          </option>
          {rank &&
            rank.map((items) => {
              return (
                <option
                  key={items.id}
                  id={items.id}
                  value={items.id}
                  role={items.uuid}
                  onClick={() => {
                    setOn(true);
                  }}
                >
                  {items.ten
                    ? `${items.ten_khoa_hoc}-${items.ten}`
                    : `${items.ten_khoa_hoc}`}
                </option>
              );
            })}
        </select>
      </div> */}
      <div
        className={`div-form-input d-flex justify-content-between ${
          on ? "border-red" : ""
        }`}
        style={{ padding: "0 12px" }}
      >
        <input
          placeholder={place}
          required
          value={value}
          type="text"
          style={{ width: "80%" }}
          onClick={() => {
            setOn(true);
          }}
          ref={inputRef}
          // onChange={handleChangeInput}
        />
        <a
          href={abc}
          className={`close ${value !== "" ? "active" : ""} `}
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </a>
        <div
          className="d-flex justify-content-center"
          style={{ alignItems: "center", width: "10%" }}
        >
          <i
            style={{ opacity: "0.5" }}
            className={`fa-solid fa-caret-down ${on ? "rote-180" : ""}`}
          ></i>
        </div>
      </div>

      <div
        className={`a position-absolute add-new-menuchild ${
          on ? "active" : ""
        }`}
      >
        <ul>
          {rank &&
            rank.map((items, index) => {
              return (
                <li key={index}>
                  <a
                    id={items.uuid}
                    role={items.id}
                    name={
                      items.ten
                        ? `${items.ten_khoa_hoc}-${items.ten}`
                        : `${items.ten_khoa_hoc}`
                    }
                    href={abc}
                    onClick={handleChangeValue}
                  >
                    {items.ten
                      ? `${items.ten_khoa_hoc}-${items.ten}`
                      : `${items.ten_khoa_hoc}`}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default InputRank;
