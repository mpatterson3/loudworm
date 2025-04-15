import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import garyPaytonImage from '../assets/Gary-Payton-strain.jpg';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      (!priceFilter.min || product.price >= parseFloat(priceFilter.min)) &&
      (!priceFilter.max || product.price <= parseFloat(priceFilter.max));
    return matchesSearch && matchesPrice;
  });

  const addProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const res = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) })
      });
      const created = await res.json();
      setProducts([...products, created]);
      setNewProduct({ name: '', price: '', description: '', image: '' });
    }
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
  };

  const saveEdit = async () => {
    const res = await fetch(`http://localhost:3001/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) })
    });
    const updated = await res.json();
    setProducts(products.map((product) =>
      product.id === editingProduct.id ? updated : product
    ));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', description: '', image: '' });
  };

  return (
    <div className="admin-page container py-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <h2>Manage Products</h2>
      <div className="mb-4">
        <form className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Product Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="col-12">
            {editingProduct ? (
              <button type="button" className="btn btn-warning" onClick={saveEdit}>Save Changes</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={addProduct}>Add Product</button>
            )}
          </div>
        </form>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td><img src={product.image || garyPaytonImage} alt="Product" className="img-thumbnail" style={{ width: '50px' }} /></td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;