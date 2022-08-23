var db = require('../../config/config');
var initModels = require('../models/init-models');
var models = initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');
const { Op, where } = require("sequelize");
const qr = require("qrcode");

//this will create new item in db
exports.create = async (Data) => {
    try {
        await db.authenticate()
        //create function will create new item
        var data=await models.fooditem.create(Data)

        return {
            response: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            response: false,
            error: new APIError({
                status: httpStatus.BAD_REQUEST || httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || "INTERAL SERVER ERROR"
            })
        }
    }
};

//this will return all data
exports.active = async () => {
    try {
        await db.authenticate();
        //it is used for select cmd of db
        var result = await models.fooditem.findAll({ where: { IsActive: true } })
        if (result !== null) {
            for (var i=0;i<result.length;i++){
                code=await qr.toDataURL(process.env.IP+result[i].FoodItemID)
                result[i].dataValues.barcode=code
    
            }
            return {
                response: true,
                data: result
            }
        } else {
            return { resposne: false, error: new APIError(httpStatus.NOT_FOUND) }
        }
    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}

exports.id = async (id) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findOne({
            where: { FoodItemID: id, IsActive: true },
            include:[
                {
                    model:models.category,
                    as:"Category"
                }
            ]
        })
        if (result == null || result.length == 0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return {
            response: true,
            data: result
        }
    } catch (error) {
        console.log(error.message)
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}
exports.delete = async (id) => {
    try {
        await db.authenticate();
        //it will dlt item
        var result = await models.fooditem.destroy({
            where: { FoodItemID: id }
        })
        if (result == null || result.length == 0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        return {
            response: true,
        }
    } catch (error) {
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}
exports.update = async (Data) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findOne({ where: { FoodItemID: Data.FoodItemID } })

        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            //this will update item
            await models.fooditem.update(Data, { where: { FoodItemID: Data.FoodItemID } })
            return { response: true }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};

exports.itemsByUserId = async (id) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findAll({
            where: { UserID: id, IsActive: true }
        })
        if (result == null || result.length == 0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        for (var i=0;i<result.length;i++){
            code=await qr.toDataURL(process.env.IP+result[i].FoodItemID)
            result[i].dataValues.barcode=code

        }

        return {
            response: true,
            data: result
        }
    } catch (error) {
        console.log(error.message)
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}

exports.itemsByCategoryId = async (userid,catid) => {
    try {
        await db.authenticate();
        var result = await models.fooditem.findAll({
            where: { CategoryID: catid,UserID:userid, IsActive: true }
        })
        if (result == null || result.length == 0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        }
        for (var i=0;i<result.length;i++){
            code=await qr.toDataURL(process.env.IP+result[i].FoodItemID)
            result[i].dataValues.barcode=code

        }

        return {
            response: true,
            data: result
        }
    } catch (error) {
        console.log(error.message)
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}

exports.notificationDates = async (id) => {
    try {
        await db.authenticate();
        await models.fooditem.update({ IsExpired: true }, { where: { ExpiryDate: { [Op.lte]: dateToday } } })
        var result = await models.fooditem.findAll({ where: { UserID: id } })
        if (result == null || result.length==0) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            var dateToday = new Date();
            for (var i = 0; i < result.length; i++) {
                    code=await qr.toDataURL(process.env.IP+result[i].FoodItemID)
                    result[i].dataValues.barcode=code
                if (result[i].NotifyDate != null) {
                    dif = Math.abs(new Date(result[i].NotifyDate) - new Date())
                    days = dif / (1000 * 3600 * 24)
                    result[i].dataValues.DaysRemaining = Math.trunc(days)

                } else {
                    result[i].dataValues.DaysRemaining = 0
                }
            }
            return {
                response: true,
                data: result
            }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};

// exports.allNonExpiredItems = async (id) => {
//     try {
//         var dateToday = new Date();
//         await db.authenticate();
//         await models.fooditem.update({ IsExpired: true }, { where: { ExpiryDate: { [Op.lte]: dateToday } } })
//         var result = await models.fooditem.findAll({ where: { IsActive: true, UserID: id } })
//         if (result == null) {
//             return {
//                 resposne: false, error: new APIError({
//                     message: "NOT FOUND",
//                     status: httpStatus.NOT_FOUND
//                 })
//             }
//         }
//         return {
//             response: true,
//             data: result
//         }


//     } catch (error) {
//         console.log(error.message)
//         return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

//     }
// };



