var db = require('../../config/config');
var initModels = require('../models/init-models');
var models = initModels(db)
const APIError = require('../errors/api-error');
const httpStatus = require('http-status');


exports.create = async (Data) => {
    try {
        await db.authenticate()
        await models.category.create(Data)
        return {
            response: true
        }
    } catch (error) {
        return {
            response: false,
            error: new APIError({
                status:httpStatus.BAD_REQUEST||httpStatus.INTERNAL_SERVER_ERROR,
                message:error.message||"INTERAL SERVER ERROR"
            })
        }
    }
};

exports.active = async () => {
    try {
        await db.authenticate();
        var result = await models.category.findAll({where:{IsActive:true}})
        if (result !== null) {
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
        var result = await models.category.findOne({
            where: { CategoryID: id,IsActive:true }
        })
        if (result == null||result.length==0) {
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
        var result = await models.category.update({IsActive:false},{
            where: { CategoryID: id }
        })
        if (result == null||result.length==0) {
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
        return { response: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }
    }
}
exports.update = async (Data) => {
    try {
        await db.authenticate();
        var result = await models.category.findOne({ where: { CategoryID: Data.CategoryID } })
        if (result == null) {
            return {
                resposne: false, error: new APIError({
                    message: "NOT FOUND",
                    status: httpStatus.NOT_FOUND
                })
            }
        } else {
            await models.category.update(Data, { where: { CategoryID: Data.CategoryID } })
            return { response: true }
        }

    } catch (error) {
        console.log(error.message)
        return { resposne: false, error: new APIError(httpStatus.INTERNAL_SERVER_ERROR) }

    }
};
