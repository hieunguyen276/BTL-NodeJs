//userRoutes.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouters');
const authRoutes = require('./authRouters');
const boardRoutes = require('./boardRouters');
const listRoutes = require('./listRouters');
const cardRoutes = require('./cardRouters');

router.get('/status', (req, res) => {
  res.status(200).json({ msg: 'API are ready'});
});


router.use('/users', userRoutes)
router.use('/auth', authRoutes);
router.use('/board', boardRoutes);
router.use('/list', listRoutes);
router.use('/card', cardRoutes);



module.exports = router;