import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const { users } = useSelector((state) => state.userReducer);
  if (users) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default AuthWrapper;
