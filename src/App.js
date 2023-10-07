import { BrowserRouter as Routers } from "react-router-dom";
import "./App.css";
import { RenderRouter } from "./router";
import { useDispatch } from "react-redux";
import { getInitData } from "./store/auth/action";
function App() {
  const dispatch = useDispatch();
  dispatch(getInitData());
  return (
    <>
      <Routers>
        <RenderRouter />
      </Routers>
    </>
  );
}

export default App;
