const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
exports.findAll = async (req,res, next) =>{
    let document = [];

    try{
        const bookService = new BookService();
        const {name} = req.query;
        if(name){
            document = await bookService.findByName(name);
        }else{
            document = await bookService.findAll();
        }
    }catch(error){
        return next(
            new ApqError(500,"An error occurred while retrieving Sáchs")
        );
    }
    return res.send(document);
};

exports.findOne = async (req,res, next) =>{
    try{
        const bookService = new BookService();
        const documents = await bookService.findById(req.params.id);
        if(!documents){
            return next(new ApiError(404,"Sách not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(
                500,  `Error requesting Sách with id = ${req.params.id}`
            )
        );
    }
};

exports.update = async (req,res, next) =>{
    if(Object.keys(req.body).length ==0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const bookService = new BookService();
        const document = await bookService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Sách not found")); 
        }
        return res.send({message: "Sách was updated successfully"});

    }catch(err){
        return next(
            new ApiError(500,`Error update Sách with id = ${req.params.id}`)
        );
    }
};

exports.updateQuantity = async (req,res, next) =>{
    try{
        const bookService = new BookService();
        const document = await bookService.updateQuantity(req.params.id);
        if(!document){
            return next(new ApiError(404,"Đã trừ số lượng sách")); 
        }
        return res.send({message: "Sách was updated successfully"});

    }catch(err){
        return next(
            new ApiError(500,`Error update Sách with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req,res, next) =>{
   try{
        const bookService = new BookService();
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Sách not found")); 
        }
        return res.send({message: "Sách was delete successfully"});
   }catch(error){
    return next(
        new ApiError(500,`Could not delete Sách with id = ${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req,res, next) =>{
    try{
        const bookService = new BookService();
        const deleteCount = await bookService.deleteAll();
        return res.send({message:  `${deleteCount} Sách was delete successfully`});
   }catch(error){
    return next(
        new ApiError(500,"An error occurred while removing all Sách")
        );
    }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const bookService = new BookService();
//         const document = await bookService.findFavorite();
//         return res.send(document);
//    }catch(error){
//     return next(
//         new ApiError(500,"An error occurred while retrieving favorite Sáchs")
//         );
//     }
// };

exports.create = async (req, res,next) => {
    try{
        const bookService = new BookService();
        const document = await bookService.create(req.body);
        return res.send(document);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while creating the Sách")
        );
    }
};