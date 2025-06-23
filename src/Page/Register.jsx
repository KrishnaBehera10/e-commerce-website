import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import asyncRegisteruser from "../Store/actions/UsersAction";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const Dispatch = useDispatch();
  // useSelector((state) => console.log(state));
  const Navigate = useNavigate();

  function RegisterHandler(data) {
    data.id = crypto.randomUUID();
    data.carts = [];
    data.isAdmin = false;
    // data.quantity = 0;
    Dispatch(asyncRegisteruser(data));
    Navigate("/login");
    reset();
  }

  return (
    <div className="w-full">
      <form
        className="sm:w-1/2 flex flex-col items-start sm:pr-10"
        onSubmit={handleSubmit(RegisterHandler)}
      >
        <label className="text-6xl pb-10">Welcome Back</label>
        <input
          type="text"
          placeholder="FirstName"
          {...register("name.firstname", { required: "firstname required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded"
        />

        {errors.name?.firstname && (
          <p className="text-red-400 text-sm px-5">
            {errors.name.firstname.message}
          </p>
        )}
        <input
          type="text"
          placeholder="LastName"
          {...register("name.lastname", { required: "lastname required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors.name?.lastname && (
          <p className="text-red-400 text-sm px-5">
            {errors.name.lastname.message}
          </p>
        )}
        <input
          type="text"
          placeholder="UserName"
          {...register("username", { required: "username required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.username && (
          <p className="text-red-400 text-sm px-5">{errors.username.message}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "email required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.email && (
          <p className="text-red-400 text-sm px-5">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "password required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.password && (
          <p className="text-red-400 text-sm px-5">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 py-2 px-4 rounded-3xl text-amber-50 mt-5 mb-5"
        >
          Register
        </button>
        <p>
          Already have an account ? <Link to="/login">login</Link>
        </p>
      </form>

      <div className="hidden sm:block w-1/2 bg-zinc-200 h-[100vh] fixed top-0 right-0 "></div>
    </div>
  );
}

export default Register;
