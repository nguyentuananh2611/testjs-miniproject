import HeaderOnly from "../../components/headerOnly";
import Sidebar from "./sidebar";
import Main from "./main";
function SpeciesPage() {
  return (
    <>
      <div className="fill-height position-relative">
        <HeaderOnly />
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default SpeciesPage;
