
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 1. Tính tổng số tiền của toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', '')) || 0;
      return total + costNumber * item.quantity;
    }, 0).toFixed(2);
  };

  // 2. Tính tổng tiền cho từng loại sản phẩm (Đơn giá x Số lượng)
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', '')) || 0;
    return (costNumber * item.quantity).toFixed(2);
  };

  // Nút tăng số lượng (+)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Nút giảm số lượng (-)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Nút Xóa sản phẩm
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Nút Checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality Coming Soon');
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>
        Total Shopping Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
              <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div className="cart-item-details" style={{ flex: 1, marginLeft: '20px' }}>
                <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
                <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)} style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
