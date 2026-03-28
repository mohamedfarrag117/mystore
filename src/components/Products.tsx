import { useEffect } from "react";
import { fetchProducts } from "../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import ProductCard from "./ProductCard";

function Products(): JSX.Element {
  const products = useAppSelector((state) => state.products.productsList);
  const loading = useAppSelector((state) => state.products.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-[#F83539] mb-4"></i>
          <h2 className="text-gray-600 text-xl font-semibold ">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4  md:grid-cols-2  p-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
