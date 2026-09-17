const jwt=require("jsonwebtoken");
const User = require("../models/users");
const redisClient = require("../config/redis");


const adminMiddleware=async (req,res,next) => {
    try{
        const {token}=req.cookies;
        if(!token)
        throw new Error("Token is not present");
            
            const payload=jwt.verify(token,process.env.JWT_KEY);//verify JWT

            const {_id}=payload;

            if(!_id)
                throw new Error("Invalid Token, ID is missing");

            const result=await User.findById(_id); //find user from database
            if(!result)
                throw new Error("User doesn't Exists");

            if(payload.role!='admin')
                throw new Error("Invalid Token")
           
            
        
            const isBlocked=await redisClient.exists(`token:${token}`) //check redis blocklist

            if(isBlocked)
                throw new Error ("Invalid Token")

            req.result=result;
        
            next();


    }catch(err){
        res.send("Error:"+err.message);
    }
}

module.exports=adminMiddleware;
