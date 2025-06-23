import { useForm } from "react-hook-form";
import { asyncUserProfileUpdate } from "../Store/actions/UsersAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function UserUpdate() {
  const { users } = useSelector((state) => state.userReducer);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: {
        firstname: users?.name?.firstname,
        lastname: users?.name?.lastname,
      },
      username: users?.username,
      password: users?.password,
      email: users?.email,
    },
  });
  const Dispatch = useDispatch();
  function UseProfileUpdate(user) {
    Dispatch(asyncUserProfileUpdate(users.id, user));
    toast.success("user profile update", {
      autoClose: 500,
      theme: "colored",
    });
  }
  return (
    <div>
      <form
        className="sm:w-1/2 flex flex-col items-start sm:pr-10"
        onSubmit={handleSubmit(UseProfileUpdate)}
      >
        <label className="text-6xl pb-10">Profile Update</label>
        <input
          type="text"
          placeholder="FirstName"
          {...register("name.firstname")}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded"
        />
        <input
          type="text"
          placeholder="LastName"
          {...register("name.lastname")}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        <input
          type="text"
          placeholder="UserName"
          {...register("username")}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 text-amber-50 mt-5 mb-5 cursor-pointer"
        >
          Profile Update
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
