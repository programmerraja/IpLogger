const express=require("express");
const {getHandler}=require("../controllers/login")
const router= express.Router();


router.get("/",getHandler);

module.exports=router;