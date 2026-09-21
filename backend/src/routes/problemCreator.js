const express=require('express');
const problemRouter=express.Router();

const adminMiddleware=require("../middlewares/adminMiddleware")
const userMiddleware=require("../middlewares/userMiddleware")

const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,getSolvedProblemsByUser,getSubmittedProblems,getProblemOfTheDay,getAllRecomendations}=require("../controllers/userProblem")

//requires admin access
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);

//user access
problemRouter.get("/ProblemById/:id",userMiddleware,getProblemById);
problemRouter.get("/getAllProblem",getAllProblem);
problemRouter.get('/recomendations',userMiddleware,getAllRecomendations);//TASK 1
problemRouter.get("/solvedProblemsByUser",userMiddleware,getSolvedProblemsByUser);
problemRouter.get("/submittedProblems/:pid",userMiddleware,getSubmittedProblems)
problemRouter.get("/problemoftheday",getProblemOfTheDay);
module.exports=problemRouter;