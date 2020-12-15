const express=require("express");
const storedetails=require("../controllers/storedetails")
const router= express.Router();


router.get("/:token",storedetails);

module.exports=router;