import { useAppSelector, useAppDispatch } from "../hooks";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.auth.user);

  const total: number = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = (): void => {
    dispatch(clearCart());
    toast.success("Order placed successfully! 🎉");
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#222] min-h-screen text-white ">
        <i className="fa-solid fa-bag-shopping text-6xl text-[#F83539] mb-6"></i>
        <h2 className="text-2xl mb-4 font-semibold">No items to checkout</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#F83539] rounded-lg transition hover:bg-[#d92c2f] px-6 py-2"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222] text-white p-10">
      <h1 className="text-3xl font-bold text-[#F83539] mb-8">
        <i className="fa-solid fa-credit-card mr-3"></i>
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* ===========================ORDER SUMMARY======================== */}
        <div className="bg-[#2b2b2b] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-700">
            <i className="fa-solid fa-receipt mr-2"></i>
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700 last:border-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-contain rounded"
                />
                <div>
                  <h3 className="font-medium text-sm truncate max-w-[200px] text-[#F83539]">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t-2 border-[#F83539]">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-[#F83539]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ==========================PLACING ORDER======================= */}
        <div className="bg-[#2b2b2b] p-6 rounded-xl">
          <h2 className="text-xl font-semibold border-b border-gray-700 mb-6 pb-4">
            <i className="fa-solid fa-user mr-2"></i>
            Customer Info
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 bg-[#383838] p-4 rounded-lg">
              <i className="fa-solid fa-user text-[#F83539]"></i>
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#383838] p-4 rounded-lg">
              <i className="fa-solid fa-envelope text-[#F83539]"></i>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#383838] p-4 rounded-lg">
              <i className="fa-solid fa-box text-[#F83539]"></i>
              <div>
                <p className="text-gray-400 text-sm">Total Items</p>
                <p className="font-medium">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#F83539] text-white py-4 rounded-lg font-bold text-lg transition duration-300 hover:bg-[#d92c2f] hover:scale-[1.02] hover:shadow-lg"
          >
            <i className="fa-solid fa-check mr-2"></i>
            Place Order — ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
