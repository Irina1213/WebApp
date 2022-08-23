const httpStatus = require('http-status')
const jwt=require('jsonwebtoken')

exports.authToken=async(req,res,next)=>{
    try{
        var token=req.header('authorization').split(' ')[1]
        if(token!=null){
            var result=await jwt.verify(token,process.env.HASH)
            next()
        }else{
            throw error
        }
    }catch(error){
        res.status(httpStatus.UNAUTHORIZED).json({
            message:"Invalid Token"
        })
    }
}