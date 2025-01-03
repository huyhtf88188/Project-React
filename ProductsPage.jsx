import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productAction";
import ProductCard from "../component/ProductCard";
import { productFilterSelector, productSelector } from "../redux/selector";
import { filterByCate, filterBySort } from "../redux/slices/productSlice";

const ProductsPage = () => {
  const [cate, setCate] = useState("");

  const dispatch = useDispatch();

  const { categoryProduct } = useSelector(productFilterSelector);

  const { products, loading, error } = useSelector(productSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortPrice = (value) => {
    dispatch(filterBySort(value));
  };

  const filteredProducts = products
    .filter((product) =>
      categoryProduct.length !== 0
        ? product.category === categoryProduct
        : product
    )
    .sort((a, b) => a.price - b.price);

  const handleFilterByCate = (value) => {
    dispatch(filterByCate(value));
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>Đã xảy ra lỗi: {error}</p>;
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 px-12">
      <h1 className="text-2xl font-bold mb-6">
        {categoryProduct.length
          ? `Danh mục: ${categoryProduct}`
          : "Tất cả sản phẩm"}
      </h1>
      <select onChange={(e) => handleFilterByCate(e.target.value)}>
        <option value="">All</option>
        <option value="T-shirt">T-shirt</option>
        <option value="jeans">Jean</option>
      </select>

      <select name="" id="" onChange={(e) => handleSortPrice(e.target.value)}>
        <option value="upPrice">Giá Tăng Dần</option>
        <option value="dowPrice"> Giá Giảm Dần</option>
        <option value="sortAZ">sắp sếp A - Z</option>
        <option value="sortZA">sắp sếp Z - A</option>
      </select>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
