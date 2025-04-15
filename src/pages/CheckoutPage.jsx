import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage({ cart, calculateTotal }) {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const calculateShippingAndTax = () => {
    // Mock shipping and tax calculation
    setShippingCost(10); // Flat shipping cost
    setTax(calculateTotal() * 0.1); // 10% tax
  };

  const handlePlaceOrder = () => {
    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
      alert('Please fill out all shipping details.');
      return;
    }

    calculateShippingAndTax();

    const orderDetails = {
      items: cart,
      total: calculateTotal() + shippingCost + tax,
      shippingAddress,
      date: new Date().toLocaleString(),
    };

    // Mock saving the order
    console.log('Order placed:', orderDetails);

    navigate('/success', { state: orderDetails });
  };

  return (
    <div className="checkout-page container py-5" style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
      <h1 className="text-center mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Shipping Address</h2>
          <form>
            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Full Name" value={shippingAddress.name} onChange={handleAddressChange} />
            </div>
            <div className="mb-3">
              <input type="text" name="address" className="form-control" placeholder="Address" value={shippingAddress.address} onChange={handleAddressChange} />
            </div>
            <div className="mb-3">
              <input type="text" name="city" className="form-control" placeholder="City" value={shippingAddress.city} onChange={handleAddressChange} />
            </div>
            <div className="mb-3">
              <input type="text" name="state" className="form-control" placeholder="State" value={shippingAddress.state} onChange={handleAddressChange} />
            </div>
            <div className="mb-3">
              <input type="text" name="zip" className="form-control" placeholder="ZIP Code" value={shippingAddress.zip} onChange={handleAddressChange} />
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Order Summary</h2>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p>Subtotal: ${calculateTotal()}</p>
          <p>Shipping: ${shippingCost}</p>
          <p>Tax: ${tax}</p>
          <h3>Total: ${calculateTotal() + shippingCost + tax}</h3>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success w-100" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default CheckoutPage;