import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
// import productRoutes from './routes/product.js';
// import cartRoutes from './routes/cart.js';
// import orderRoutes from './routes/orders.js';
// import newsletterRoutes from './routes/newsletter.js'/

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/newsletter', newsletterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));