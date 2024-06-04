import React, { useState } from 'react';
import products from './products';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const renderCartItems = () => {
    return cart.map((item) => (
      <div key={item.id} className="cart-item">
        <h4>{item.name}</h4>
        <p>Price: ₹{item.price}</p>
        {item.coins && item.coins.length > 0 && (
          <p>
            Earn {item.coins[0].value} {item.coins[0].symbol}
          </p>
        )}
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="cart-items">{renderCartItems()}</div>
      <h3>Products</h3>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>
          {product.isEcoFriendly && <span className="eco-friendly">Eco-Friendly</span>}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;