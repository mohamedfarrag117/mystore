import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Link } from "react-router-dom";

function Cart(): JSX.Element {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart.cartItems) || [];

  const total: number = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#222] text-white p-10">
      <h1 className="text-3xl font-bold text-[#F83539] mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="empty cart"
            className="w-40 mb-6 opacity-80"
          />

          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>

          <p className="text-gray-400 mb-6">You didn't add any products yet!</p>

          <Link to="/products" className="bg-[#F83539] px-6 py-2 rounded">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[#2b2b2b] p-4 rounded-lg mb-4"
            >
              <div className="flex items-center gap-4 w-[40%]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />

                <div className="overflow-hidden">
                  <h2 className="font-semibold truncate">{item.title}</h2>
                  <p className="text-gray-400">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="bg-gray-700 rounded px-3 py-1 "
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="bg-green-600 rounded px-3 py-1"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-[#F83539] rounded hover:bg-red-600 px-3 py-1"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between mt-8  border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </h2>

            <Link
              to="/checkout"
              className="bg-[#F83539] rounded-lg px-8 py-3  font-semibold text-lg  hover:bg-[#d92c2f] hover:scale-105 hover:shadow-lg transition duration-300"
            >
              <i className="fa-solid fa-credit-card mr-2"></i>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
