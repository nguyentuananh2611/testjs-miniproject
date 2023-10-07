import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, authLoading } from "../../store/auth";
function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(authLoading);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const onChangForm = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = (data) => {
    let errors = {};
    if (!data.username) {
      errors.exist = true;
      errors.username = "Username is required";
    }
    if (!data.password) {
      errors.exist = true;
      errors.password = "Password is required";
    }
    setErrors(errors);
    return !errors.exist;
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    let is_validate = validate(data);
    if (is_validate) {
      const resulAction = await dispatch(loginAction(data));
      if (loginAction.rejected.match(resulAction)) {
        const errorMessage = resulAction.error.message;
        alert(errorMessage);
      } else {
        alert("đăng nhập thành công");
        navigate("/species");
      }
    }
  };

  return (
    <>
      <form className="formLogin" onSubmit={onsubmit}>
        <div className="divForm">
          <div className="d-flex align-content-center justify-content-center">
            <div className="bgImage-form"></div>
          </div>
          <div className="text-h5">Đăng nhập</div>
          <div className="formInput">
            <div className="divInput">
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={onChangForm}
                disabled={loading}
              />
            </div>
            {errors.username !== "" && (
            <div data-test="error" className="error">
              {errors.username}
            </div>
          )}
            <br />
            <div className="divInput">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={onChangForm}
                disabled={loading}
              />
            </div>
            {errors.password !== "" && (
            <div data-test="error" className="error">
              {errors.password}
            </div>
          )}
          </div>
          <br />
          <div className="formButton">
            <button type="submit" disabled={loading}>
              Đăng nhập
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormLogin;
