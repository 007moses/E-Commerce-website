import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch featured products on mount
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/featured');
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load featured products.');
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // Sample categories for navigation
  const categories = [
    { name: 'Electronics', path: '/products/electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop' },
    { name: 'Clothing', path: '/products/clothing', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Books', path: '/products/books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4ebd0c?q=80&w=1974&auto=format&fit=crop' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Amazing Deals</h1>
          <p className="hero-subtitle">Shop the best products at unbeatable prices!</p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`product-card product-card-${index}`}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <Link to={`/products/${product.id}`} className="product-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              className={`category-card category-card-${index}`}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2 className="promo-title">Limited Time Offer!</h2>
          <p className="promo-text">Get 20% off on your first purchase. Use code: FIRST20</p>
          <Link to="/products" className="promo-btn">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;