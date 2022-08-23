const httpStatus = require('http-status');
const fooditem = require('../services/fooditem.services');
const APIError = require('../errors/api-error');
const { isEmpty } = require('lodash');


exports.create = async (req, res, next) => {
  try {
    var { Data } = req.body;
    Data = JSON.parse(Data)
    if (Data == undefined || isEmpty(Data)) return next(new APIError({
      status: httpStatus.BAD_REQUEST,
      message: "BAD REQUEST"
    }))
    Data.IsActive = true
    Data.ImageSrc = req.file.path.replace(/\\/g, "/")
    var result = await fooditem.create(Data);
    // var code=await qr.toDataURL("http://192.168.10.22:4000/v1/fooditem/2")
    if (result.response) {
      res.status(httpStatus.CREATED);
      res.json({
        Status: { code: httpStatus.OK, "message": "Success" },
        Data: {
          // code:code
        }
      })
    } else {
      return next(result.error)
    }

  } catch (error) {
    
    return next(error)

  }
};

exports.update = async (req, res, next) => {
  try {
    var Data = req.body;
    // Data = JSON.parse(Data)
    if (Data == undefined || isEmpty(Data)) return next(new APIError({
      status: httpStatus.BAD_REQUEST,
      message: "BAD REQUEST"
    }))
    Data.FoodItemID = req.params.id
    delete Data.ImageSrc
    var result = await fooditem.update(Data)
    if (result.response) {
      res.status(httpStatus.OK);
      res.json({
        Status: {
          "code": httpStatus.OK,
          "message": "Success"
        }, Data: {}
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    console.log(error.message)
    return next(error)
  }
};

exports.all = async (req, res, next) => {
  try {
    var result = await fooditem.active()
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success"
        },
        Data: { data: result.data }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}


exports.id = async (req, res, next) => {
  try {
    var id = req.params.id
    var result = await fooditem.id(id)
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success"
        },
        Data: { data: result.data }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    var id = req.params.id
    var result = await fooditem.delete(id)
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success"
        },
        Data: {}
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}

exports.notificationDates = async (req, res, next) => {
  try {
    id = req.params.id
    var result = await fooditem.notificationDates(id)
    if (result.response) {
      res.status(httpStatus.OK);
      res.json({
        Status: {
          "code": httpStatus.OK,
          "message": "Success"
        }, Data: {
          data:result.data}
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
};

// exports.allNonExpiredItems = async (req, res, next) => {
//   try {
//     id=req.params.id
//     var result = await fooditem.allNonExpiredItems(id)
//     if (result.response) {
//       res.status(httpStatus.OK);
//       res.json({
//         Status: {
//           "code": httpStatus.OK,
//           "message": "Success"
//         }, Data: {
//           data:result.data}
//       })
//     } else {
//       return next(result.error)
//     }
//   } catch (error) {
//     return next(error)
//   }
// };

exports.itemsByUserId = async (req, res, next) => {
  try {
    var id = req.params.id
    var result = await fooditem.itemsByUserId(id)
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success"
        },
        Data: { data: result.data }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}

exports.itemsByCategoryId = async (req, res, next) => {
  try {
    var userid = req.query.userid
    var catid = req.query.catid

    console.log(userid+" "+catid)
    var result = await fooditem.itemsByCategoryId(userid,catid)
    if (result.response) {
      res.status(httpStatus.OK).json({
        Status: {
          code: httpStatus.OK,
          message: "Success"
        },
        Data: { data: result.data }
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    return next(error)
  }
}

exports.foodItemView = async (req, res, next) => {
  try {
    var id = req.params.id
    var result = await fooditem.id(id)
    if (result.response) {
      res.render('../src/api/views/fooditem',
      {
        data:result.data
      })
    } else {
      return next(result.error)
    }
  } catch (error) {
    console.log(error.message)
    return next(error)
  }
}
