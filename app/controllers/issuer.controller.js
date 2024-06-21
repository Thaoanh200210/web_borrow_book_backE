const ApiError = require("../api-error");
const IssuerService = require("../services/issuer.service");
const MongoDB = require("../utils/mongodb.util");
exports.findAll = async (req,res, next) =>{
    let document = [];

    try{
        const issuerService = new IssuerService();
        const {name} = req.query;
        if(name){
            document = await issuerService.findByName(name);
        }else{
            document = await issuerService.findAll();
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while retrieving Nhà xuất bảns")
        );
    }
    return res.send(document);
};

exports.findOne = async (req,res, next) =>{
    try{
        const issuerService = new IssuerService();
        const documents = await issuerService.findById(req.params.id);
        if(!documents){
            return next(new ApiError(404,"Nhà xuất bản not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(
                500,  `Error requesting Nhà xuất bản with id = ${req.params.id}`
            )
        );
    }
};

exports.update = async (req,res, next) =>{
    if(Object.keys(req.body).length ==0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const issuerService = new IssuerService();
        const document = await issuerService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Nhà xuất bản not found")); 
        }
        return res.send({message: "Nhà xuất bản cập nhật thành công"});

    }catch(err){
        return next(
            new ApiError(500,`Error update Nhà xuất bản with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req,res, next) =>{
   try{
        const issuerService = new IssuerService();
        const document = await issuerService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Nhà xuất bản not found")); 
        }
        return res.send({message: "Nhà xuất bản was delete successfully"});
   }catch(error){
    return next(
        new ApiError(500,`Could not delete Nhà xuất bản with id = ${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req,res, next) =>{
    try{
        const issuerService = new IssuerService();
        const deleteCount = await issuerService.deleteAll();
        return res.send({message:  `${deleteCount} Nhà xuất bản was delete successfully`});
   }catch(error){
    return next(
        new ApiError(500,"An error occurred while removing all Nhà xuất bản")
        );
    }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const issuerService = new IssuerService();
//         const document = await issuerService.findFavorite();
//         return res.send(document);
//    }catch(error){
//     return next(
//         new ApiError(500,"An error occurred while retrieving favorite Nhà xuất bảns")
//         );
//     }
// };

exports.create = async (req, res,next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try{
        const issuerService = new IssuerService();
        const document = await issuerService.create(req.body);
        return res.send(document);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while creating the Nhà xuất bản")
        );
    }
};