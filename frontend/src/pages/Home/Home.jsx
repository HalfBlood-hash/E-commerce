import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../featrure/product/productslice";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className="home-page">
      <h1>Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="product-error">{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products available.</p>}

      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            <h2>{product.name}</h2>
            <h3>{product.fullName}</h3>
            <p className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</p>
            <p>{product.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
