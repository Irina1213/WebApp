const express = require('express');
const controller = require('../../controllers/category.controller');
const router = express.Router();

router
    .route('/')
    .get(controller.all)
    .post(controller.create);


router
    .route('/:id')
    .get(controller.id)
    .patch(controller.delete)
    .put(controller.update)

module.exports = router;
