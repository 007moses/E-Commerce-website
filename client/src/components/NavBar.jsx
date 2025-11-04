import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import '../Styles/NavBar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(0); // Replace with actual cart state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in and simulate cart items
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // Simulate fetching cart items (replace with API call)
    setCartItems(3); // Example: 3 items in cart
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Shop
        </Link>
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="dropdown">
            <span className="navbar-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Products
            </span>
            <div className={`dropdown-content ${isDropdownOpen ? 'dropdown-open' : ''}`}>
              <Link to="/products/electronics" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                Electronics
              </Link>
              <Link to="/products/clothing" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                Clothing
              </Link>
              <Link to="/products/books" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                Books
              </Link>
            </div>
          </li>
          <li className="cart-link">
            <Link to="/cart" className="navbar-link cart-icon">
              <FaShoppingCart />
              <span className="cart-badge">{cartItems}</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="navbar-link">
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;