/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { editCart, removeCart } from "../redux/slices/cartAction";
import { useEffect, useState } from "react";
import { fetchProductById } from "../redux/slices/productAction";

// eslint-disable-next-line react/prop-types
const CartList = ({ item }) => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const data = await dispatch(fetchProductById(item.productId)).unwrap();
      setProduct(data);
    })();
  }, []);

  const totalAmount = item.cartPrice * item.quantity;

  const handleRemoveItem = (id) => {
    dispatch(removeCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(editCart({ id, cart: { quantity } }));
      console.log(id);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow rounded-lg">
      <div className="flex items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-16 h-16 rounded mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500">Giá: {product.price}₫</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        Số Lượng :
        <button
          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 text-sm bg-gray-200 rounded-l"
        >
          -
        </button>
        <span className="px-3 py-1 text-sm bg-gray-100 border">
          {item.quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 text-sm bg-gray-200 rounded-r"
        >
          +
        </button>
      </div>

      <div>
        <p className="text-gray-500">Tổng tiền: {totalAmount} VNĐ</p>
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="text-red-500 text-sm"
      >
        Xóa
      </button>
    </div>
  );
};

export default CartList;
