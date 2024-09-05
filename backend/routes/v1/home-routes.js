const express = require('express');
const { HomeController} = require('../../controllers');

const router = express.Router();

router.get('/find-by-user/:id', HomeController.findHomeByUser);
router.put('/update-users/:id', HomeController.updateUsers);

module.exports = router;