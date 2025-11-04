import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import "../Styles/Footer.css"

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! (Functionality TBD)');
    // Add newsletter subscription logic here
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Products</Link></li>
            <li><Link to="/cart" className="footer-link">Cart</Link></li>
            <li><Link to="/profile" className="footer-link">Profile</Link></li>
            <li><Link to="/login" className="footer-link">Login/Signup</Link></li>
          </ul>
        </div>
        <div className="footer-section footer-contact">
          <h3 className="footer-title">Contact Us</h3>
          <p>Email: support@eshop.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 E-Shop St, City, Country</p>
        </div>
        <div className="footer-section footer-social">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook />
            </a>
          </div>
        </div>
        <div className="footer-section footer-newsletter">
          <h3 className="footer-title">Newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;