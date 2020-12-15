require("dotenv").config();
const mongoose=require("mongoose");
const victimmodel=require("../models/victimmodels");
const dbConnect=require("../dbconnect");

//handling GET /admin

function getHandler(req,res)
{
	//if he is auth allow him else not 
	if(req.app.locals.isAuth)
	{
		res.render("admin");
	}
	else
	{
		res.redirect("/login");
	}
}

//handling POST /admin
async function postHandler(req,res)
{
	if(req.body)
	{
		let {name ,password}=req.body;
		if(name=== process.env.USERNAME && password===process.env.PASSWORD)
		{
				req.app.locals.isAuth=true;
				res.render("admin");
		}
		else
		{
			res.app.locals.error_msg="Invalid username or password";
			res.redirect("/login");
		}
	}
	else
	{
		res.redirect("/login");
	}
}



module.exports={getHandler,postHandler};