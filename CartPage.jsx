import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "../redux/slices/cartAction";
import { fetchProducts } from "../redux/slices/productAction";
import CartList from "./CartList";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.carts);
  const { products } = useSelector((state) => state.products);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCarts(user.id));
      dispatch(fetchProducts());
    }
  }, [user.id, dispatch]);

  const totalMoney = carts.reduce(
    (total, item) => total + item.cartPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (carts.length === 0) {
      alert(
        "Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
    } else {
      alert(
        `Thanh toán thành công! Tổng số tiền: ${totalMoney.toLocaleString()}₫`
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (carts.length === 0) return <p>Giỏ hàng của bạn trống!</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Giỏ Hàng</h1>
      <div className="space-y-4">
        {carts.map((item, index) => (
          <CartList key={index} item={item} />
        ))}
        <div className="text-right">
          <p className="text-lg font-bold">
            Tổng cộng: {totalMoney.toLocaleString()}₫
          </p>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
