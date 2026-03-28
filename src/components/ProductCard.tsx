import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { Product } from "../types";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!product) return null;

  const handleAddToCart = (): void => {
    if (!isLoggedIn) {
      toast.warn("Login to add products", {
        icon: "🔒",
        onClick: () => navigate("/login"),
      });
      return;
    }
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (): void => {
    if (!isLoggedIn) {
      toast.warn("Login to manage your cart", {
        icon: "🔒",
        onClick: () => navigate("/login"),
      });
      return;
    }
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border-[1px] shadow-md p-4  h-[320px] hover:shadow-xl transition">
      <div className="h-40 flex items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full object-contain hover:rotate-2 hover:scale-105 transition duration-500"
        />
      </div>

      <div className="mt-3">
        <h2 className="font-semibold text-lg  line-clamp-1">{product.title}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Link
          to={`/products/${product.id}`}
          className="bg-[#F83539] text-white px-3 rounded text-sm py-1.5"
        >
          View Details
        </Link>

        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center bg-green-500 text-white w-9 h-9  rounded hover:bg-green-600 transition"
        >
          <i className="fa-solid fa-cart-plus"></i>
        </button>

        <button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center bg-[#F83539] text-white w-9 h-9  rounded hover:bg-red-600 transition"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
