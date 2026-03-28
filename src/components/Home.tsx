import { Link } from "react-router-dom";

function Home(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F83539]">
      <div className="text-center bg-white p-5 md:p-10 mx-4 rounded-2xl shadow-xl">
        <h1 className="text-5xl font-bold mb-6 text-[#F83539]">
          Welcome to My Store
        </h1>

        <p className="mb-8 text-gray-600 text-lg">
          Discover the best products with amazing prices
        </p>

        <Link
          to="/products"
          className="inline-block bg-[#F83539] text-white font-semibold px-7 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
