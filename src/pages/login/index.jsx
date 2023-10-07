import HeaderLogin from "./headerLogin";
import FormLogin from "./formLogin";
function LoginPage() {
  return (
    <>
      <div className="fill-height bgImage">
        <HeaderLogin />
        <FormLogin />
      </div>
    </>
  );
}

export default LoginPage;
