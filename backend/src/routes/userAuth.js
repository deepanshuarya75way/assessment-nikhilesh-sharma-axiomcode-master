const express=require('express');
const authRouter=express.Router();
const {register,login,logout,adminRegister,deleteProfile,getProfile,updateProfile}=require("../controllers/userAutent")
const userMiddleware=require('../middlewares/userMiddleware')
const adminMiddleware=require('../middlewares/adminMiddleware')

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister)

// Verify the session and return the current user's authentication and dashboard state
authRouter.get('/check', userMiddleware, (req, res) => {
  
    const todayStr = new Date().toISOString().split('T')[0];
    const lastSolvedStr = req.result.lastPotdSolved ? new Date(req.result.lastPotdSolved).toISOString().split('T')[0] : null;

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id: req.result._id,
        role: req.result.role,
        potdStreak: req.result.potdStreak || 0,
        hasSolvedToday: lastSolvedStr === todayStr,
        contestScore:req.result.contestScore
    }

    res.status(200).json({
        user: reply,
        message: "Valid User"
    })
});
authRouter.delete('/delete',userMiddleware,deleteProfile)
authRouter.get('/getprofile',userMiddleware,getProfile);
authRouter.put('/updateprofile',userMiddleware,updateProfile);
module.exports= authRouter;
