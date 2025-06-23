import { useForm } from "react-hook-form";
import asyncCreateProducts from "../../Store/Actions/ProductsAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  function CreateProductHandle(product) {
    product.id = crypto.randomUUID();
    dispatch(asyncCreateProducts(product));
    toast.success("update successful", {
      autoClose: 500,
      theme: "colored",
    });
    Navigate("/products");
    reset();
  }
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-5xl pb-5">Create Product</h1>
      <form
        className="sm:w-1/2 flex flex-col items-start"
        onSubmit={handleSubmit(CreateProductHandle)}
      >
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "title must required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.title ? (
          <p className="text-xs text-red-400">{errors.title.message}</p>
        ) : (
          ""
        )}
        <input
          type="number"
          max={10000}
          min={1}
          placeholder="Price"
          {...register("price", { required: "price must required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.price ? (
          <p className="text-xs text-red-400">{errors.price.message}</p>
        ) : (
          ""
        )}
        <input
          type="url"
          max={10000}
          min={1}
          placeholder="Image URL"
          {...register("image", { required: "image url must required" })}
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
        />
        {errors?.image ? (
          <p className="text-xs text-red-400">{errors.image.message}</p>
        ) : (
          ""
        )}
        <textarea
          {...register("description", {
            required: "description must required",
          })}
          placeholder="Description"
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3 resize-none h-30"
        />
        {errors?.description ? (
          <p className="text-xs text-red-400">{errors.description.message}</p>
        ) : (
          ""
        )}
        <select
          className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
          {...register("category", { required: "category is required" })}
        >
          <option value="">Select category</option>
          <option value="Men's clothing">Men's clothing</option>
          <option value="Women's clothing">Women's clothing</option>
          <option value="kid's clothing">kid's clothing</option>
          <option value="fashion clothing">fashion clothing</option>
          <option value="jewelery">Jewelery</option>
        </select>
        {errors?.category ? (
          <p className="text-xs text-red-400">{errors.category.message}</p>
        ) : (
          ""
        )}
        <button type="submit" className="bg-gray-500 text-white py-2 px-3 mt-4">
          Create Products
        </button>
      </form>
    </div>
  );
}

export default CreateProducts;
