import React, { useState } from 'react';
import products from '../Cart/product';
import './EcoCart.css';

const EcoCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div className="ecocart-page">
      <div className="ecocart-wrapper">
        <h1 className="ecocart-page-title">🌿 Eco Basket</h1>

        {/* Cart section */}
        <h2 className="ecocart-section-title">🛒 Your Cart ({cart.length})</h2>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">Your cart is empty. Add eco-friendly products below!</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  {item.coins && item.coins.length > 0 && (
                    <p>Earn {item.coins[0].value} {item.coins[0].symbol}</p>
                  )}
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {/* Products section */}
        <h2 className="ecocart-section-title">🌱 Eco-Friendly Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="cart-image" />
              <div className="product-card-body">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                {product.isEcoFriendly && (
                  <span className="eco-friendly">🍃 Eco-Friendly</span>
                )}
              </div>
              <div className="product-card-footer">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoCart;
