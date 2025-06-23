import { useDispatch, useSelector } from "react-redux";
import { asyncUserProfileUpdate } from "../Store/Actions/UsersAction";
import { FiAlertCircle } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";

function Cart() {
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const price = users?.carts?.reduce((acc, pro) => {
    return acc + pro.price * pro.quantity;
  }, 0);

  function quantityIncrease(id, product) {
    const copyuser = { ...users, carts: [...users.carts] };
    const userindex = copyuser.carts.findIndex((user) => user.id === id);

    copyuser.carts[userindex] = {
      ...product,
      quantity: copyuser.carts[userindex].quantity + 1,
    };

    dispatch(asyncUserProfileUpdate(copyuser.id, copyuser));
  }

  function quantityDecrease(id, product) {
    let copyuser = { ...users, carts: [...users.carts] };
    const userindex = copyuser.carts.findIndex((user) => user.id === id);

    if (copyuser.carts[userindex].quantity > 1) {
      copyuser.carts[userindex] = {
        ...product,
        quantity: copyuser.carts[userindex].quantity - 1,
      };
    } else {
      copyuser = {
        ...copyuser,
        carts: copyuser.carts.filter((pro) => pro.id != id),
      };
    }

    dispatch(asyncUserProfileUpdate(copyuser.id, copyuser));
  }

  function DeleteCart(id, product) {
    let copyuser = { ...users, carts: [...users.carts] };
    const userindex = copyuser.carts.findIndex(
      (user) => user.id === product.id
    );

    copyuser.carts[userindex] = {
      ...product,
      quantity: 0,
    };

    copyuser = {
      ...copyuser,
      carts: copyuser.carts.filter((pro) => pro.id != id),
    };

    dispatch(asyncUserProfileUpdate(copyuser.id, copyuser));
  }

  const showproduct = users?.carts?.map((pro) => {
    return (
      <div
        key={pro.id}
        className="border border-gray-100  flex items-center gap-5 rounded p-3 flex-wrap sm:flex-nowrap"
      >
        <img
          src={pro?.image}
          alt="product"
          className="w-full sm:w-[10vw] h-[10vh] object-contain"
        />
        <div className="w-full shrink-10">
          <p className="text-2xl">{pro?.title?.slice(0, 10)}</p>
          <p className="text-sm">{pro?.description?.slice(0, 100)}</p>
          <p className="font-semibold">{pro?.price} ₹</p>
        </div>
        <div className="flex flex-col gap-3 group relative">
          <div className="flex items-center justify-between gap-3 border border-gray-200 rounded-2xl px-3 py-1 w-24">
            <button
              className="flex-1 sm:text-base  cursor-pointer"
              onClick={() => quantityDecrease(pro.id, pro)}
            >
              -
            </button>
            <p>{pro.quantity}</p>
            <button
              className="flex-1 sm:text-bas  cursor-pointer"
              onClick={() => quantityIncrease(pro.id, pro)}
            >
              +
            </button>
          </div>
          <div
            className="flex justify-center rounded-2xl px-3 py-2 w-24 bg-red-600 cursor-pointer"
            onClick={() => DeleteCart(pro.id, pro)}
          >
            <IoTrashBin className="text-white" />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      {users?.carts?.length != 0 && (
        <Link
          to="/products"
          className="bg-zinc-400 rounded text-white py-2 px-4"
        >
          Back
        </Link>
      )}
      {users?.carts?.length != 0 ? (
        <div className="grid grid-cols sm:grid-cols-2 gap-3 mt-6">
          <div className="flex flex-col gap-y-3">{showproduct}</div>
          {users?.carts?.length != 0 ? (
            <div className="h-[40vh] border border-gray-200 p-3 rounded">
              <h1 className="text-4xl pb-5">TOTAL</h1>
              <hr className="mb-5 border border-gray-200" />
              <p className="flex justify-between text-xl pb-5">
                Subtotal
                <span className="text-4xl pr-5">{parseInt(price)}₹</span>
              </p>
              <p className="flex justify-between text-xl pb-5">
                Shipping tax
                <span className="pr-5">
                  <FiAlertCircle />
                </span>
              </p>
              <hr className="mb-5 border border-gray-200" />
              <button className="bg-blue-600 text-white py-2 w-full rounded cursor-pointer text-sm">
                CHECKOUT
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p className="text-5xl">Empty</p>
      )}
    </div>
  );
}

export default Cart;
