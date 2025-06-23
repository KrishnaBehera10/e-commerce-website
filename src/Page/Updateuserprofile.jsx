import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUser, asyncUserDelete } from "../Store/Actions/UsersAction";

function Updateuserprofile() {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);

  function createProducts() {
    Navigate("updateprofile/admin/create-product");
  }
  function ProfileUpdate() {
    Navigate("updateprofile/profileupdate");
  }
  function UserLogout() {
    Dispatch(asyncLogoutUser());
    Navigate("/login");
  }
  function UserDelete() {
    Dispatch(asyncUserDelete(users.id));
    Navigate("/login");
  }
  return (
    <div className="w-full h-full">
      <h1 className="text-5xl mb-5">Setting</h1>
      <div className="w-full  py-5 sm:py-10 mb-10">
        <div className="mb-5">
          <p className="text-4xl text-ellipsis line-clamp-2">
            {users?.name?.firstname}
            <span>{users?.name?.lastname}</span>
          </p>
          <p className="text-xl overflow-hidden text-ellipsis pt-1">
            {users.email}
          </p>
          <p className="text-xl flex pt-1 text-ellipsis line-clamp-1">
            {users.username}
            {users.isAdmin ? (
              <sup className=" text-red-600 pl-1 font-semibold text-xs line-clamp-1 text-ellipsis">
                Admin
              </sup>
            ) : (
              <sup className=" text-green-600 pl-1 text-xs font-semibold">
                User
              </sup>
            )}
          </p>
          <p className="text-md"></p>
        </div>

        <div className="w-full flex gap-3 flex-wrap">
          {users && users.isAdmin && (
            <button
              onClick={createProducts}
              className="bg-gray-600 text-white py-2 px-3 rounded cursor-pointer"
            >
              Create Products
            </button>
          )}
          <button
            onClick={ProfileUpdate}
            className="bg-blue-600 text-white py-2 px-3 rounded cursor-pointer"
          >
            Profile Update
          </button>
          <button
            onClick={UserLogout}
            className="bg-green-600 text-white py-2 px-3 rounded cursor-pointer"
          >
            Logout
          </button>
          <button
            onClick={UserDelete}
            className="bg-red-600 text-white py-2 px-3 rounded cursor-pointer"
          >
            User Delete
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Updateuserprofile;
