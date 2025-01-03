import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productAction";
import SliderShow from "../component/sliderShowImage/SliderShow";
import { fetchCarts } from "../redux/slices/cartAction";
import ProductWrapper from "../component/ProductWrapper";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.carts);

  const { id } = JSON.parse(localStorage.getItem("user") || "[]");
  useEffect(() => {
    dispatch(fetchProducts());
    if (id) {
      dispatch(fetchCarts(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <SliderShow />
      <div className="bg-gray-100 py-6 ">
        <div className="container mx-auto max-w-6xl px-12">
          <div className="">
            <ProductWrapper category="T-shirt" products={products} />
          </div>
          <div className="">
            <ProductWrapper category="jeans" products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
