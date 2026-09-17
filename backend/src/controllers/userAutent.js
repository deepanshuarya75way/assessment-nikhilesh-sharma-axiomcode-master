const User= require('../models/users');
const Submission=require('../models/submission')
const validate=require('../utils/validator')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const redisClient=require('../config/redis');

const register= async(req,res)=>{
    try{
        validate(req.body)

        const {firstName,emailId,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        req.body.role="user";
         
        const user= await User.create(req.body);
       
        const token=jwt.sign({_id:user._id,emailId:emailId,role:'user'},process.env.JWT_KEY,{expiresIn: 60*60});
        res.cookie("token",token,{maxAge: 60*60*1000,httpOnly: true ,secure: true,sameSite: 'none' });
        
        const reply={
                firstName:user.firstName,
                emailId:user.emailId,
                _id:user._id
        }
        res.status(201).json({
                user:reply,
                message:"Registered Successfully"
        })
       

    }catch(err){
        res.status(400).send("Error:"+err);
    }
}
const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
       

        const user = await User.findOne({ emailId });

        // If user doesn't exist, throw error immediately
        if (!user) throw new Error("Invalid Credentials user hai nhi");
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid Credentials password glt hai ");

        const token = jwt.sign(
            { _id: user._id, emailId: emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true ,secure: true,sameSite: 'none'});

        res.status(200).json({
            user: {
                firstName: user.firstName,
                emailId: user.emailId,
                _id: user._id,
                role: user.role // Important for Admin button logic!
            },
            message: "Login Successfully"
        });

    } catch (err) {
        // Send a clean JSON object instead of a string
        res.status(401).json({ message: err.message });
    }
};

const logout=async(req,res)=>{
    try{
       
        const {token}=req.cookies;
        const paylaod=jwt.decode(token);

        // Add the token to Redis blacklist until its original expiry time
        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,paylaod.exp);

        //clear the coookies
        res.cookie("token",null,{expires:new Date(Date.now())}); 
        res.send("Logged out Successfully");
    }catch(err){
        res.status(401).json({ message: err.message });
    }
}

const adminRegister=async(req,res)=>{
    try{

        validate(req.body)

        const {firstName,emailId,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
         
        const user= await User.create(req.body);
        res.status(201).send("New Admin Registered Successfully");

    }catch(err){
        res.status(400).json({ message: err.message || "Registration failed" });
    }
}

const deleteProfile=async(req,res)=>{
try{
    const userId=req.result._id;

    await User.findByIdAndDelete(userId);
    await Submission.deleteMany(userId);

    res.status(200).send("Profile Deleted Successfully")


}catch(err){
    res.status(500).send("Failed to delete user: " + err.message);
}
}

const getProfile = async (req, res) => {
    try {
       
        const userId = req.result._id;

        // Return only required profile fields and exclude sensitive data
        const user = await User.findById(userId)
            .select('firstName lastName emailId age role potdStreak lastPotdSolved PotdSolved ProblemSolved');

        if (!user) {
            return res.status(404).send("User nahi mila database mein");
        }

        // Saaf-suthra response bhej diya frontend ko
        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).send("Server Error: " + err.message);
    }
};


const updateProfile = async (req, res) => {
    try {
        const userId = req.result._id;
        const { firstName, lastName, age } = req.body;

        // Validation : FirstName 
        if (!firstName || firstName.trim().length < 3 || firstName.trim().length > 20) {
            return res.status(400).send("Error: First name 3 se 20 characters ka hona chahiye.");
        }

        if (lastName && (lastName.trim().length < 3 || lastName.trim().length > 20)) {
            return res.status(400).send("Error: Last name 3 se 20 characters ka hona chahiye.");
        }

        if (age && (age < 6 || age > 80)) {
            return res.status(400).send("Error: Age 6 aur 80 ke beech honi chahiye.");
        }

        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                $set: { 
                    firstName: firstName.trim(), 
                    lastName: lastName ? lastName.trim() : "", 
                    age: age ? Number(age) : undefined 
                } 
            },
            { new: true, runValidators: true } 
        ).select('firstName lastName emailId age');
            
        return res.status(200).json({
            message: "Profile updated successfully!",
            user: updatedUser

        });

    } catch (err) {
        return res.status(400).send("Error updating profile: " + err.message);
    }
};


module.exports={register,login,logout,adminRegister,deleteProfile,getProfile,updateProfile}

