require("dotenv").config();

const mongoose=require("mongoose");
var isconnected=false;
async function dbConnect()
{
	if(process.env.DBURL)
	{
		try
		{
		 	if(!isconnected)
		 	{
		 		//connecting to mongodb
		 		await mongoose.connect(process.env.DBURL,{useUnifiedTopology: true,useNewUrlParser: true });
		 		isconnected=true;

			}
			//so it already connected so we return true
			return true
		}
		catch(err)
		{
			console.log("error connecting mongodb",err.message);
		}
	}
	else
	{
		console.log("env value is not defined");
	}
}

module.exports=dbConnect;