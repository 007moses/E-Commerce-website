import express from 'express';
import cart from '../models/Cart.js';
import Product from '../models/Product.js'
import auth from '../middleware/auth.js';
import { Router } from 'express';
const router = Router();

const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

router.get('/', auth, async (req, res) => {
  try {
    const cart = await getCart(req.user.userId);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await getCart(req.user.userId);

    const product = await Product.findById(productId);
    if (!product || product.stock === 0) return res.status(404).json({ message: 'Product not available' });

    const itemIndex = cart.items.findIndex((item) => item.product.id.toString() === productId);
    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity >= product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        product: {
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
        },
        quantity: 1,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await getCart(req.user.userId);

    const itemIndex = cart.items.findIndex((item) => item.product.id.toString() === productId);
    if (itemIndex > -1) {
      const product = await Product.findById(productId);
      if (quantity > product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[itemIndex].quantity = quantity;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await getCart(req.user.userId);

    cart.items = cart.items.filter((item) => item.product.id.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;