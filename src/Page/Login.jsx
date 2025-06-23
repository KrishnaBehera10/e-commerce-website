import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginuser } from "../Store/actions/UsersAction";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  function LoginHandler(user) {
    Dispatch(asyncLoginuser(user));
    Navigate("/");
  }
  return (
    <div className="w-full">
      <form
        className="sm:w-1/2 flex flex-col items-start sm:pr-10"
        onSubmit={handleSubmit(LoginHandler)}
      >
        <label className="text-6xl pb-10">Welcome</label>
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
          Login
        </button>
        <p>
          Dont't have an account ? <Link to="/register">Register</Link>
        </p>
      </form>

      <div className="hidden sm:block w-1/2 bg-pink-200 h-[100vh] fixed top-0 right-0 "></div>
    </div>
  );
}

export default Login;
