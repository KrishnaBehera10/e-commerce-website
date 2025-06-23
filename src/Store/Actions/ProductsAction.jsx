import axis from "../../Api/Axiosconfig";
import { productsLoader } from "../Reducers/ProductsSlice";

const asyncCreateProducts = (product) => async () => {
  try {
    await axis.post("/products", product);
  } catch (error) {
    console.log(error);
  }
};

export default asyncCreateProducts;

export const asyncGetProduct = () => async (dispatch) => {
  try {
    const { data } = await axis.get("/products");
    dispatch(productsLoader(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateproduct = (product) => async (dispatch) => {
  try {
    await axis.patch(`/products/${product.id}`, product);
    dispatch(asyncGetProduct());
  } catch (error) {
    console.log(error);
  }
};
