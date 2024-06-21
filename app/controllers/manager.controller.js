const ApiError = require("../api-error");
const ManagerService = require("../services/manager.service");
const MongoDB = require("../utils/mongodb.util");

exports.login = async (req, res, next) => {
  let document = [];

  try {
    const managerService = new ManagerService();
    let manager = await managerService.login(req.body);
    if (manager) {
      res.json({
        status: "success",
        data: manager,
      });
    } else {
      res.json({
        status: "error",
        message: "Manager not found",
      });
    }
  } catch (error) {
    return next(
      new ApqError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(document);
};

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const managerService = new ManagerService();
    const { name } = req.query;
    if (name) {
      document = await managerService.findByName(name);
    } else {
      document = await managerService.findAll();
    }
  } catch (error) {
    return next(
      new ApqError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(document);
};

exports.findOne = async (req, res, next) => {
  try {
    const managerService = new ManagerService();
    const documents = await managerService.findById(req.params.id);
    if (!documents) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `Error requesting contact with id = ${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const managerService = new ManagerService();
    const document = await managerService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (err) {
    return next(
      new ApiError(500, `Error update contact with id = ${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const managerService = new ManagerService();
    const document = await managerService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was delete successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id = ${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const managerService = new ManagerService();
    const deleteCount = await managerService.deleteAll();
    return res.send({
      message: `${deleteCount} Contact was delete successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all contact")
    );
  }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const managerService = new ManagerService();
//         const document = await managerService.findFavorite();
//         return res.send(document);
//    }catch(error){
//     return next(
//         new ApiError(500,"An error occurred while retrieving favorite contacts")
//         );
//     }
// };

exports.create = async (req, res, next) => {
  try {
    const managerService = new ManagerService();
    const document = await managerService.create(req.body);
    return res.send(document);
  } catch (e) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const managerService = new ManagerService();
    const { sodienthoai, password } = req.body; // Lấy số điện thoại và mật khẩu từ request body
    const document = await managerService.login({ sodienthoai, password }); // Gửi thông tin đăng nhập đến userService
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi đăng nhập người dùng"));
  }
};
// exports.login = async (req, res, next) => {
//   try {
//       const managerService = new ManagerService();
//       const { sodienthoai, password } = req.body; // Lấy số điện thoại và mật khẩu từ request body
//       const document = await managerService.login({ sodienthoai, password }); // Gửi thông tin đăng nhập đến userService
//       console.log(document)
//       if(document){
//               req.user = JSON.stringify(document);
//           }
//       return res.send(JSON.stringify(document));
//   } catch (error) {
//       return next(
//           new ApiError(500, "Lỗi khi đăng nhập người dùng")
//       );
//   }
// };

exports.logout = async (req, res, next) => {
  try {
      if (!req.user) {
          return res.status(401).json({ message: "Người dùng chưa đăng nhập" });
      }
      req.user = null; // Xóa thông tin người dùng khỏi session hoặc token
      console.log("Đã đăng xuất");
      return res.json({
          message: "Đăng xuất thành công"
      });
  } catch (error) {
      return next(
          new ApiError(500, "Lỗi khi đăng xuất người dùng")
      );
  }
}
