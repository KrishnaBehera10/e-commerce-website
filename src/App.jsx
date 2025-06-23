import MainRoute from "./Router/MainRoute";
import Nav from "./Components/Nav";
import { useEffect } from "react";
import { asyncCurrentUser } from "./Store/actions/UsersAction";
import { useDispatch } from "react-redux";
import { asyncGetProduct } from "./Store/Actions/ProductsAction";

function App() {
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(asyncCurrentUser());
    Dispatch(asyncGetProduct());
  }, []);
  return (
    <div className="w-full h-[100vh] p-6 sm:p-10 font-thin relative">
      <Nav />
      <MainRoute />
    </div>
  );
}

export default App;
