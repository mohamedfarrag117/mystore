import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../redux/authSlice";
import { resetCartState } from "../redux/cartSlice";
import { toast } from "react-toastify";

function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const totalItems: number = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = (): void => {
    dispatch(resetCartState());

    dispatch(logout());

    toast.info("Logged out successfully");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-10 py-4">
        <Link to="/" className="flex items-center gap-2">
          <i className="fa-brands fa-shopify text-3xl text-[#F83539]"></i>
          <span className="font-bold text-lg">MY STORE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-[#F83539] transition font-medium">
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-[#F83539] transition font-medium"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="hover:text-[#F83539] transition font-medium relative"
          >
            <i className="fa-solid fa-cart-shopping mr-1"></i>
            Cart
            {isLoggedIn && totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#F83539] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">
                <i className="fa-solid fa-user mr-1"></i>
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition font-medium"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#F83539] text-white px-4 py-2 rounded-lg hover:bg-[#d92c2f] transition font-medium"
            >
              <i className="fa-solid fa-right-to-bracket mr-1"></i>
              Login
            </Link>
          )}
        </div>

        {/* ============BurgerMENU=========== */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-[#F83539]"
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* =================Mobile ============== */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end gap-4 px-6 pb-6">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#F83539] transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#F83539] transition font-medium"
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#F83539] transition font-medium"
          >
            <i className="fa-solid fa-cart-shopping mr-1"></i>
            Cart {isLoggedIn && totalItems > 0 && `(${totalItems})`}
          </Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-500 text-sm">
                <i className="fa-solid fa-user mr-1"></i>
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[#F83539] font-medium"
            >
              <i className="fa-solid fa-right-to-bracket mr-1"></i>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
