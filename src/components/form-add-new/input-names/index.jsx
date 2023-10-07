import { useState, useEffect, useRef, useCallback } from "react";
function InputNames(props) {
  let {
    postData,
    setPostData,
    placeholder,
    is_name,
    validate,
    setValidate,
    valueInput,
    setValueInput,
  } = props;
  const [on, setOn] = useState(false);
  const inputRef = useRef();
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Kiểm tra nếu không phải là input thì gọi hàm setOn với giá trị false
      setOn(false);
    }
  };

  useEffect(() => {
    // Đăng ký sự kiện click trên document khi component được mount
    document.addEventListener("click", handleClickOutside);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValueInput({ ...valueInput, [name]: value });
      setValidate({ ...validate, [name]: value });
      setPostData({ ...postData, [name]: value });
    },
    [postData, setPostData, validate, setValidate, valueInput, setValueInput]
  );
  return (
    <>
      <div
        className={`div-form-input ${on ? "border-red" : ""}`}
        style={{ padding: "0 12px" }}
      >
        <input
          placeholder={placeholder}
          name={is_name}
          type="text"
          value={valueInput[is_name]}
          onClick={() => {
            setOn(true);
          }}
          ref={inputRef}
          onChange={handleChangeInput}
          required
        />
      </div>
    </>
  );
}

export default InputNames;
