const express = require('express');
const user=require("./user.routes")
const category=require("./category.routes")
const fooditem=require("./fooditem.routes")

const router = express.Router();

/**
 * GET v1/status
 */
// router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/user',user);
router.use('/category',category);
router.use('/fooditem',fooditem);


module.exports = router;
