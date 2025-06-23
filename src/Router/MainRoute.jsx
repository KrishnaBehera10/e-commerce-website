import { Route, Routes } from "react-router-dom";
import Home from "../Page/Home";
import CreateProducts from "../Page/Admin/CreateProducts";
import Products from "../Page/Products";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Cart from "../Page/Cart";
import PageNotFound from "../Page/PageNotFound";
import Updateuserprofile from "../Page/Updateuserprofile";
import UserUpdate from "../Page/UserUpdate";
import DetailsProducts from "../Page/DetailsProducts";
import AuthWrapper from "../Page/AuthWrapper";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="products"
        element={
          <AuthWrapper>
            <Products />
          </AuthWrapper>
        }
      />
      <Route
        path="products/details/:id"
        element={
          <AuthWrapper>
            <DetailsProducts />
          </AuthWrapper>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />
      <Route
        path="updateprofile"
        element={
          <AuthWrapper>
            <Updateuserprofile />
          </AuthWrapper>
        }
      >
        <Route
          path="updateprofile/admin/create-product"
          element={
            <AuthWrapper>
              <CreateProducts />
            </AuthWrapper>
          }
        />
        <Route
          path="updateprofile/profileupdate"
          element={
            <AuthWrapper>
              <UserUpdate />
            </AuthWrapper>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default MainRoute;
