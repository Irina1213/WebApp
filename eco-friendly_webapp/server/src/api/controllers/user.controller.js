const httpStatus = require('http-status');
const user = require('../services/user.service');
const APIError = require('../errors/api-error');
const { isEmpty } = require('lodash');
const bcrypt=require('bcrypt')


/**
 * Create new user
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    var Data = req.body;
    if(Data==undefined||isEmpty(Data))return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    Data.IsActive=true
    Data.Password=await bcrypt.hash(Data.Password,10)
    var result=await user.register(Data);
    if(result.response){
        res.status(httpStatus.CREATED);
        res.json({
            Status:{code:httpStatus.OK,"message":"Success"},
            Data:{}
        })
    }else{
        return next(result.error)
    }
    
} catch (error) {
    return next(error)
       
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) =>{
    try{
        var Data = req.body;
        if(Data==undefined||isEmpty(Data))return next(new APIError({
          status:httpStatus.BAD_REQUEST,
          message:"BAD REQUEST"
        }))
        Data.UserID=req.params.id
            var result=await user.update(Data)
            if(result.response){
                res.status(httpStatus.OK);
                res.json({
                    Status:{"code":httpStatus.OK,
                    "message":"Success"},Data:{}
                })
            }else{
              return next(result.error)
            }
    }catch(error){
       return next(error)
    }
};

exports.delete = async (req, res, next) =>{
  try{
          id=req.params.id
          var result=await user.delete(id)
          if(result.response){
              res.status(httpStatus.OK);
              res.json({
                  Status:{"code":httpStatus.OK,
                  "message":"Success"},Data:{}
              })
          }else{
            return next(result.error)
          }
  }catch(error){
     return next(error)
  }
};


exports.all = async(req,res,next)=>{
  try{
      var result=await user.active()
      if(result.response){
          res.status(httpStatus.OK).json({
             Status:{ code:httpStatus.OK,
              message:"Success"},
              Data:{data:result.data}
          })
      }else{
        return next(result.error)
      }
}catch(error){
  return next(error)
}
},

exports.id=async(req,res,next)=>{
  try{
    var id=req.params.id
    var result=await user.id(id)
    if(result.response){
        res.status(httpStatus.OK).json({
            Status:{code:httpStatus.OK,
            message:"Success"},
            Data:{data:result.data}
        })
    }else{
      return next(result.error)
    }
}catch(error){
return next(error)
}
}

exports.login=async(req,res,next)=>{
  try {
    var Data = req.body;
    if(Data==undefined||isEmpty(Data))return next(new APIError({
      status:httpStatus.BAD_REQUEST,
      message:"BAD REQUEST"
    }))
    var result=await user.login(Data);
    if(result.response){
        res.status(httpStatus.CREATED);
        res.json({
            Status:{code:httpStatus.OK,"message":"Success"},
            Data:{
              token:result.token,
              data:result.data
            }
        })
    }else{
        return next(result.error)
    }
    
} catch (error) {
  console.log(error.message)
    return next(error)
       
  }
}