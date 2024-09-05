const express = require('express');
const userRoutes = require('./user-routes');
const homeRoutes = require('./home-routes');
const user = require('./user');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/home', homeRoutes);

module.exports = router;