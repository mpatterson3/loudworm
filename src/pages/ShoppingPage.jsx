import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingPage.css';
import { saveOrder } from '../mockApi';

function ShoppingPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderDetails = {
      items: cart,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    saveOrder(orderDetails);
    navigate('/success', { state: orderDetails });
    setCart([]);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Shop Our Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} style={{height: '150px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary mt-auto w-100" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-section mt-5">
        <h2>Your Cart</h2>
        <ul className="list-group mb-3">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ${item.price}
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Total: ${calculateTotal()}</h3>
        {cart.length > 0 && <button className="btn btn-success w-100" onClick={handleCheckout}>Proceed to Checkout</button>}
      </div>
    </div>
  );
}

export default ShoppingPage;