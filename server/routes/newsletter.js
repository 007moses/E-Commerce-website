const express = require('express');
const Newsletter = require('../models/Newsletter');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) return res.status(400).json({ message: 'Email already subscribed' });

    const subscriber = new Newsletter({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;