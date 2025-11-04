import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Styles/Cart.css"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch cart items on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (!token) {
      setError('Please log in to view your cart.');
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cart.');
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update quantity of an item
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/cart',
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.items);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  // Remove an item from the cart
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });
      setCartItems(response.data.items);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Handle checkout (placeholder)
  const handleCheckout = () => {
    alert('Proceeding to checkout... (Functionality TBD)');
    // Add checkout logic here (e.g., redirect to payment page)
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">
          {error}
          {!isLoggedIn && (
            <Link to="/login" className="login-link">
              Log In
            </Link>
          )}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="shop-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.product.id} className={`cart-item cart-item-${index}`}>
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <p className="summary-total">
              Total: <span>${totalPrice.toFixed(2)}</span>
            </p>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;