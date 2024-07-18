const express = require('express');
const router = express.Router();
router.route('/').get(routerController.getAll)

module.exports = router;