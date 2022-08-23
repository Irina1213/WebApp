var multer=require('multer')

var storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'src/fooditem/')
    },
    filename:function(req,file,cb){
       cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_")+ file.originalname)
    }
})

var upload=multer({storage:storage})

module.exports=upload