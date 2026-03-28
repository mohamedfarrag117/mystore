import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { toast } from "react-toastify";

function ProductDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products.productsList);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#222]">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-[#F83539] mb-4"></i>
          <h2 className="text-xl text-white font-semibold ">Loading...</h2>
        </div>
      </div>
    );
  }

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#222] text-white p-10">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl bg-[#2b2b2b] rounded-xl shadow-xl p-8">
        <div className="flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain w-80"
          />
        </div>

        <div>
          <h1 className="font-bold text-3xl text-[#F83539] mb-4">
            {product.title}
          </h1>

          <p className="text-gray-300 mb-6">{product.description}</p>

          <p className="text-2xl mb-6">${product.price}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#F83539] rounded  hover:bg-[#d92c2f] hover:scale-105 hover:shadow-lg transition duration-300 px-6 py-2"
            >
              {isLoggedIn ? (
                <>
                  <i className="fa-solid fa-cart-plus mr-2"></i>
                  Add to Cart
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock mr-2"></i>
                  Login to Add
                </>
              )}
            </button>

            <button
              onClick={() => navigate("/products")}
              className="border border-[#F83539] rounded hover:bg-[#F83539] hover:text-white hover:scale-105 transition duration-300 px-6 py-2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
