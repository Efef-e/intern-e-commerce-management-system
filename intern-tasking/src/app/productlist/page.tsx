"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  seller: string;
  stock: number;
  price: number;
  discountPrice?: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    inStock: true,
  });

  useEffect(() => {
    const storedProductsJSON =
      localStorage.getItem("products");
    const storedProducts = storedProductsJSON
      ? JSON.parse(storedProductsJSON)
      : [];
    setProducts(storedProducts);
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const applyFilters = () => {
    const storedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const filteredProducts = storedProducts.filter(
      (product: Product) => {
        const inPriceRange =
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice;
        const inInStock = filters.inStock
          ? product.stock > 0
          : true;
        return inPriceRange && inInStock;
      }
    );
    setProducts(filteredProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/4">
          <div>
            <label>Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="border text-black p-2 w-full"
            ></input>
          </div>
          <div>
            <label>Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="border text-black p-2 w-full"
            ></input>
          </div>
          <div>
            <label>Products in Stock:</label>
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
              className="border text-white p-2 w-full"
            ></input>
          </div>
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Filter
          </button>
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4">
                <h2>{product.name}</h2>
                <p>Seller: {product.seller}</p>
                <p>Stock: {product.stock}</p>
                <p>Price: {product.price}</p>
                {product.discountPrice && (
                  <p>
                    Discount Price: {product.discountPrice}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
