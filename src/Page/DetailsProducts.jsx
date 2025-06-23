import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { asyncUpdateproduct } from "../Store/Actions/ProductsAction";
import { useEffect } from "react";
import { asyncUserProfileUpdate } from "../Store/Actions/UsersAction";

function DetailsProducts() {
  const { products } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const filterProduct = products.find((product) => product.id == id);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: filterProduct?.id,
      category: filterProduct?.category,
      image: filterProduct?.image,
      price: filterProduct?.price,
      title: filterProduct?.title,
      description: filterProduct?.description,
    },
  });

  function Addtocart(product) {
    const copyuser = { ...users, carts: [...users.carts] };

    const userindex = copyuser.carts.findIndex(
      (user) => user.id === product.id
    );

    if (userindex == -1) copyuser.carts.push({ ...product, quantity: 1 });
    else
      copyuser.carts[userindex] = {
        ...product,
        quantity: copyuser.carts[userindex].quantity + 1,
      };

    dispatch(asyncUserProfileUpdate(copyuser.id, copyuser));
  }

  function AdminproductUpdate(product) {
    dispatch(asyncUpdateproduct(product));
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="w-full h-screen">
      <Link to="/products" className="bg-zinc-400 rounded text-white py-2 px-4">
        Back
      </Link>
      <div className="w-full flex justify-between items-center gap-10 flex-wrap sm:flex-nowrap mt-6">
        <div className="w-full h-[25vh] sm:w-[25vw] sm:h-[40vh]">
          <img
            src={filterProduct?.image}
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-full">
          <p className="text-3xl sm:text-5xl line-clamp-6">
            {filterProduct?.title}
          </p>
          <p className="text-md pt-6">{filterProduct?.description}</p>
          <p className="text-md pt-1">{filterProduct?.category}</p>
          <p className="text-md pt-3 text-blue-500 font-medium">
            {filterProduct?.price} ₹
          </p>
          <button
            className="bg-blue-500 py-2 px-4 text-white rounded mt-3 cursor-pointer"
            onClick={() => Addtocart(filterProduct)}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div>
        {users && users.isAdmin && (
          <form
            className="sm:w-1/2 flex flex-col items-start h-screen"
            onSubmit={handleSubmit(AdminproductUpdate)}
          >
            <h1 className="text-5xl my-6">Update</h1>
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
              <p className="text-xs text-red-400">
                {errors.description.message}
              </p>
            ) : (
              ""
            )}
            <select
              className="border border-gray-300 w-full py-2 px-4 outline-0 rounded mt-3"
              {...register("category", { required: "category is required" })}
            >
              <option value="">Select category</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="kid's clothing">Kid's clothing</option>
              <option value="fashion clothing">Fashion clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
            {errors?.category ? (
              <p className="text-xs text-red-400">{errors.category.message}</p>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-3 mt-4 rounded cursor-pointer"
            >
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default DetailsProducts;
