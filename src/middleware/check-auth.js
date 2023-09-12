const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const verify = jwt.verify(token,"this is dummy text");
        console.log(verify);
        // next();
        if(verify.userType == 'admin'){
          next();
        }
        else{
          return res.status(401).json({
            message:'This is Not Admin'
          })
        }

    } catch (error) {
      res.status(401).json({
        error:"Invalid Token & Please Login ?"
      })  
    }
}




