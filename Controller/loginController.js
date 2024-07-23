const loginService = require('../Service/loginService');

exports.userLogin = async (req, res) => {
    loginService.loginUser(req.body, (error, result) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.status(200).json(result);
    });
};

exports.userRegister = async (req, res) => {
    loginService.registerUser(req.body, (error, result) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.status(200).json(result);
    });
};


exports.viewUser=async(req,res)=>{
    loginService.userView(req.body,(error,result)=>{
        if (error) {
            
             res.status(400).json(error);
        }
        res.status(200).json(result);
    })
}


