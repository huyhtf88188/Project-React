import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/slices/productAction";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createCart, editCart, fetchCarts } from "../redux/slices/cartAction";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const { carts } = useSelector((state) => state.carts);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCarts(user.id));
    }
  }, [user.id, dispatch]);
  console.log(carts);

  const handleAddCart = (productId, product) => {
    const key = `${product.title}_${product.id}`;
    const cartItem = {
      productId,
      cartPrice: product.price,
      quantity: 1,
      userId: user.id,
      id: key,
    };

    const existingItem = carts.find((item) => item.id === key);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      dispatch(editCart({ id: updatedItem.id, cart: updatedItem }));
      alert("Sản phẩm đã được cập nhật số lượng trong giỏ hàng!");
      return;
    }

    dispatch(createCart(cartItem));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          dispatch(fetchProductById(id));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, id]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  if (!product) {
    return <p>Sản phẩm không tồn tại.</p>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow-xl">
          {/* Hình ảnh sản phẩm */}
          <div className="space-y-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <div className="mt-4">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
              >
                {product.images?.map((img, index) => (
                  <div key={index} className="px-2">
                    <img
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Thông tin chi tiết sản phẩm */}
          <div className="space-y-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-xl text-red-600 font-bold">
              {product.price.toLocaleString()} VNĐ
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-yellow-500 text-lg">
                ★ {product.rating}
              </span>
              <span className="text-gray-600 text-sm">
                ({product.reviews?.length} đánh giá)
              </span>
            </div>
            <div className="text-gray-700">
              <p className="mt-4">{product.description}</p>
            </div>
            <button
              onClick={() => handleAddCart(id, product)}
              className="mt-8 px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
