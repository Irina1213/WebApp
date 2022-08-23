const express = require('express');
const controller = require('../../controllers/user.controller');
const router = express.Router();

router
  .route('/')
  .get(controller.all)

router
  .route('/register')
  .post(controller.register);

router
  .route('/:id')
  .get(controller.id)
  .put(controller.update)
  .patch(controller.delete)

router
  .route('/login')
  .post(controller.login)

module.exports = router;
