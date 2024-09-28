import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onRemoveFromCart }) => {
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [paymentMode, setPaymentMode] = useState('creditCard');
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  const handleCheckoutClick = () => {
    if (!userDetails.name || !userDetails.email) {
      alert("Please fill in your details before checking out.");
      return;
    }
    setCheckoutMessage('Thank you for shopping!');
  };

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', ''));
      return total + item.quantity * (isNaN(itemCost) ? 0 : itemCost);
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    onRemoveFromCart(item);
  };

  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2);
  };

  return (
    <div className="cart-container">
      {checkoutMessage ? (
        <h1 className='center-checkout-message'>{checkoutMessage}</h1>
      ) : (
        <>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">{item.cost}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Total: ${calculateTotalCost(item)}
                  </div>
                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-details" style={{ marginTop: '20px' }}>
            <h3>Payment Details</h3>
            <label>
              Name:
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </label>
            <label>
              Payment Mode:
              <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </label>
          </div>

          <button className="product-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="product-button" onClick={handleCheckoutClick}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
