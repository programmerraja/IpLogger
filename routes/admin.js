const express=require("express");
const {getHandler,postHandler}=require("../controllers/admin")

const router= express.Router();

router.get("/",getHandler);

router.post("/",postHandler);


module.exports=router;