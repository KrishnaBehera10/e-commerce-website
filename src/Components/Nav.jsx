import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrMenu } from "react-icons/gr";
import { RiCloseLargeFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function Nav() {
  const { users } = useSelector((state) => state.userReducer);
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    function sizeHandle() {
      if (window.innerWidth > 640) {
        setisOpen(false);
      }
    }

    window.addEventListener("resize", sizeHandle);

    return () => {
      window.removeEventListener("resize", sizeHandle);
    };
  }, []);

  function menuToggle() {
    setisOpen(!isOpen);
  }

  //animation gsap
  const navref = useRef();

  useGSAP(() => {
    let timeline = gsap.timeline();
    timeline.from("#logo", {
      color: "black",
      opacity: 0,
      duration: 1,
      delay: 1,
      x: -30,
      stagger: 1,
    });

    timeline.from(navref.current, {
      color: "black",
      opacity: 0,
      duration: 1,
      data: 1,
      y: -30,
      stagger: 1,
    });
  });

  return (
    <div className="flex justify-between items-center mb-3 sm:mb-10 z-20 relative">
      <Link id="logo" to="/">
        <h1 className="text-4xl">Buzz Shop</h1>
      </Link>
      <div id="logo" className="block sm:hidden">
        {isOpen ? (
          <RiCloseLargeFill className="text-3xl" onClick={menuToggle} />
        ) : (
          <GrMenu className="text-3xl" onClick={menuToggle} />
        )}
      </div>

      {/* desktop screen  */}

      <nav className="gap-10 hidden sm:flex" ref={navref}>
        <NavLink to="/">Home</NavLink>

        {users ? (
          <>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">
              <p className="relative">
                Cart
                {users?.carts?.length != 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white w-4 h-4 rounded-2xl flex items-center justify-center text-xs">
                    {users?.carts?.length}
                  </span>
                )}
              </p>
            </NavLink>
            <NavLink to="/updateprofile">Profile</NavLink>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>

      {/* // mobile screen  */}

      {isOpen && (
        <nav
          className={`sm:hidden flex flex-col gap-4 bg-white absolute top-full left-0 w-full shadow p-4 z-10 transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } `}
        >
          <NavLink to="/" onClick={() => setisOpen(false)}>
            Home
          </NavLink>

          {users ? (
            <>
              <NavLink to="/products" onClick={() => setisOpen(false)}>
                Products
              </NavLink>
              <NavLink to="/cart" onClick={() => setisOpen(false)}>
                Cart
              </NavLink>
              <NavLink to="/updateprofile" onClick={() => setisOpen(false)}>
                Profile
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setisOpen(false)}>
              Login
            </NavLink>
          )}
        </nav>
      )}
    </div>
  );
}

export default Nav;
