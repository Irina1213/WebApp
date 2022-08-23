const express = require('express');
const controller = require('../../controllers/fooditem.controller');
const multer = require('../../middlewares/multer.middleware')
const router = express.Router();
const { authToken } = require('../../middlewares/tokenAuth.middleware')
router
    .route('/')
    .get(authToken, controller.all)
    .post(authToken, multer.single('ImageSrc'), controller.create);

router
    .route('/notificationDates/:id')
    .get(authToken, controller.notificationDates)

// router
//     .route('/nonexpired/:id')
//     .get(controller.allNonExpiredItems)


router
    .route('/categoryid/')
    .get(authToken, controller.itemsByCategoryId)


router
    .route('/userid/:id')
    .get(authToken, controller.itemsByUserId)

router
    .route('/view/:id')
    .get( controller.foodItemView)

router
    .route('/:id')
    .get(controller.id)
    .patch(authToken, controller.delete)
    .put(authToken, controller.update)

module.exports = router;
