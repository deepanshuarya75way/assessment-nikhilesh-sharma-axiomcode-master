const jwt=require("jsonwebtoken");
const User = require("../models/users");
const redisClient = require("../config/redis");


const userMiddleware=async (req,res,next) => {
    try{
        const {token}=req.cookies;
        if(!token)
        throw new Error("Token is not present");
    
            const payload=jwt.verify(token,process.env.JWT_KEY);//verify token JWT

            const {_id}=payload;

            if(!_id)
                throw new Error("Invalid Token, ID is missing");

            const result=await User.findById(_id);
            if(!result)
                throw new Error("User doesn't Exists");

          
        
            const isBlocked=await redisClient.exists(`token:${token}`)  //check redis blocklist

            if(isBlocked)
                throw new Error ("Invalid Token")

            req.result=result;
        
            next();


    }catch(err){
        res.status(401).json({ message: err.message });
    }
}

module.exports=userMiddleware;