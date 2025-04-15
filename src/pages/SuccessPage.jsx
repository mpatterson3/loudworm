import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;

  if (!orderDetails) {
    navigate('/shop');
    return null;
  }

  return (
    <div className="success-page">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <h2>Order Summary</h2>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <h3>Total: ${orderDetails.total}</h3>
      <p>Order Date: {orderDetails.date}</p>
      <button onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );
}

export default SuccessPage;