const constants = require("../constants/index");
// const { CookieProvider } = require("../helper/cookies");
class Middleware{


    async authenticate(req, res, next){
        // let userString = req.user;
        let user = req.headers["user"];
        if(user){
            req.user = user;
            return next();
        }else{
          return res.send("Lỗi đăng nhập")
        }
    }

    async ensureAuthenticated(req, res, next){
        try {
            if (req.authenticated()) {
              return next(); 
            }
            // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            res.redirect('/login');
          } catch (error) {
            // Xử lý bất kỳ lỗi nào ở đây
            console.error('Error in ensureAuthenticated middleware:', error);
            res.status(500).send('Internal Server Error');
          }
    }

}module.exports = { Middleware };