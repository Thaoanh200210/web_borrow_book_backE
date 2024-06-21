const ApiError = require("../api-error");
const BorrowBookService = require("../services/borrow_book.service");
const MongoDB = require("../utils/mongodb.util");
const mongoose = require("mongoose");
exports.findAll = async (req,res, next) =>{
    let document = [];

    try{
        const borrowBookService = new BorrowBookService();
        const {name} = req.query;
        if(name){
            document = await borrowBookService.findByName(name);
        }else{
            document = await borrowBookService.findAll();
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while retrieving Mượn sáchs")
        );
    }
    return res.send(document);
};

exports.findOne = async (req,res, next) =>{
    try{
        const borrowBookService = new BorrowBookService();
        const documents = await borrowBookService.findById(req.params.id);
        if(!documents){
            return next(new ApiError(404,"Mượn sách not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(
                500,  `Error requesting Mượn sách with id = ${req.params.id}`
            )
        );
    }
};
exports.findByUserId = async (req,res, next) =>{
    try{
        const borrowBookService = new BorrowBookService();
        const documents = await borrowBookService.find({madocgia: new mongoose.Types.ObjectId(req.params.id) });
        console.log(documents)
        if(!documents){
            return next(new ApiError(404,"Mượn sách not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(
                500,  `Error requesting Mượn sách with id = ${req.params.id}`
            )
        );
    }
};
exports.update = async (req,res, next) =>{
    if(Object.keys(req.body).length ==0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Mượn sách not found")); 
        }
        return res.send({message: "Mượn sách was updated successfully"});

    }catch(err){
        return next(
            new ApiError(500,`Error update Mượn sách with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req,res, next) =>{
   try{
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Mượn sách not found")); 
        }
        return res.send({message: "Mượn sách was delete successfully"});
   }catch(error){
    return next(
        new ApiError(500,`Could not delete Mượn sách with id = ${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req,res, next) =>{
    try{
        const borrowBookService = new BorrowBookService();
        const deleteCount = await borrowBookService.deleteAll();
        return res.send({message:  `${deleteCount} Mượn sách was delete successfully`});
   }catch(error){
    return next(
        new ApiError(500,"An error occurred while removing all Mượn sách")
        );
    }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const borrowBookService = new BorrowBookService();
//         const document = await borrowBookService.findFavorite();
//         return res.send(document);
//    }catch(error){
//     return next(
//         new ApiError(500,"An error occurred while retrieving favorite Mượn sáchs")
//         );
//     }
// };

exports.create = async (req, res,next) => {
    try{
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.create(req.body);
        return res.send(document);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while creating the Mượn sách")
        );
    }
};