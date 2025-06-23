import { Userloading, UserLogOut } from "../Reducers/UserSlice";
import axios from "../../Api/Axiosconfig";

const asyncRegisteruser = (user) => async () => {
  try {
    await axios.post("/users", user);
  } catch (error) {
    console.log(error);
  }
};

export default asyncRegisteruser;

export const asyncLoginuser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    localStorage.setItem("users", JSON.stringify(data[0]));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser = () => async (dispatch) => {
  const currentuser = JSON.parse(localStorage.getItem("users"));
  if (currentuser) dispatch(Userloading(currentuser));
  else dispatch(UserLogOut());
};

export const asyncLogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("users");
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncUserProfileUpdate = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/users/${id}`, user);
    localStorage.setItem("users", JSON.stringify(data));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncUserDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error);
  }
};
