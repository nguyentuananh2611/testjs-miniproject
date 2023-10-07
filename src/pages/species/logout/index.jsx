import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../store/auth";
function Logout(props) {
  const { name, kyTuDauTien, role } = props;
  let abc = "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutAction());
    await navigate("/");
  };
  return (
    <>
      <div className="padding-4px">
        <div className="padding-16px-0px d-flex justify-content-center">
          <div className="avartar__text__64">{kyTuDauTien}</div>
        </div>
        <h3 className="text__h3 lineHeight-15">{name}</h3>
        <div className="lineHeight-15">
          <a
            href={abc}
            className="padding-0px-12px margin-4px text-decoration-none text__a lineHeight-15"
            style={{ backgroundColor: role.meta.color }}
          >
            <span className="text__span">{name}</span>
          </a>
        </div>
        <div className="padding-12px-8px-8px d-flex justify-content-between ">
          <a href={abc} className="height-36px ho-so">
            <span>Hồ sơ</span>
          </a>
          <button className="height-36px dang-xuat" onClick={handleLogout}>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Logout;
