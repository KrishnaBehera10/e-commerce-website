import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncUserProfileUpdate } from "../Store/Actions/UsersAction";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";

function Products() {
  const { products } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [filtermenu, setfiltermenu] = useState([
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ]);
  const [filter, setfilter] = useState([]);
  const [openfilter, setopenfilter] = useState(false);

  useEffect(() => {
    function filterclose() {
      if (window.innerWidth > 640) {
        setopenfilter(false);
      }
    }
    window.addEventListener("resize", filterclose);

    return () => {
      window.removeEventListener("resize", filterclose);
    };
  }, []);

  function filterHandle(product) {
    setfilter((pre) =>
      pre.includes(product)
        ? pre.filter((pro) => pro != product)
        : [...pre, product]
    );
  }

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

  const filterProducts =
    filter.length != 0
      ? products.filter((pro) => filter.includes(pro.category))
      : products;

  const showproduct = filterProducts.map((pro) => {
    return (
      <div
        key={pro.id}
        className="border border-gray-100 active:scale-104 duration-150 transition-transform  flex flex-col justify-between gap-5 rounded p-3"
      >
        <img
          src={pro.image}
          alt="product"
          className="w-full h-[10vh] object-contain"
        />
        <p className="text-2xl">{pro.title.slice(0, 10)}</p>
        <p className="text-sm">{pro.description.slice(0, 100)}</p>

        <div className="flex justify-between gap-y-2">
          <Link
            to={`/products/details/${pro.id}`}
            className="bg-gray-600 py-1 px-4 text-white rounded"
          >
            View
          </Link>
          <button
            className="bg-yellow-500 p-2 cursor-pointer text-sm rounded"
            onClick={() => Addtocart(pro)}
          >
            <BsCart />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="relative">
      <h1 className="text-5xl mb-5 sticky top-0 z-10 bg-white py-5">
        keep shopping
      </h1>
      <button
        className="mb-5 bg-gray-100 px-4 py-2 text-black sm:hidden"
        onClick={() => setopenfilter(!openfilter)}
      >
        {openfilter ? "Clear" : "Filter"}
      </button>
      <div className="flex justify-between items-start flex-wrap sm:flex-nowrap gap-5 relative">
        <div className="hidden sm:w-[320px] sm:h-[600px] bg-gray-50 top-0 left-0 p-10 sm:flex flex-col gap-5">
          <h1 className="font-mono">Category</h1>
          {filtermenu.map((menu, index) => {
            return (
              <label key={index} className="flex items-center gap-1 w-fit">
                <input
                  type="checkbox"
                  onChange={() => filterHandle(menu)}
                  checked={filter.includes(menu)}
                />
                <span className="text-sm capitalize">{menu}</span>
              </label>
            );
          })}
        </div>

        {openfilter && (
          <div className="sm:hidden flex flex-col gap-y-1">
            <h1 className="mb-3 font-mono">Category</h1>
            {filtermenu.map((menu, index) => {
              return (
                <label key={index} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    onChange={() => filterHandle(menu)}
                    checked={filter.includes(menu)}
                  />
                  <span className="text-sm capitalize">{menu}</span>
                </label>
              );
            })}
          </div>
        )}
        <div className="w-full shrink-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <>{showproduct}</>
        </div>
      </div>
    </div>
  );
}

export default Products;
