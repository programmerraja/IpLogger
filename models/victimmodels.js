const mongoose=require("mongoose");


let schema=new mongoose.Schema(
								{
									token:
									{
										type:String
									},
									victimname:
									{
										type:String
									},
									isvisited:
									{
										type:Boolean,
										default:false
									},
									ip:
									{
										type:String
									},
									city:
									{
										type:String
									},
									region:
									{
										type:String
									},
									country:
									{
										type:String
									},
									org:
									{
										type:String
									},	
								    device:
								    {
										type:JSON
									},														
								 	os:
								 	{
										type:String
									},									
									browser:
									{
										type:String									
									}
								}
								);


let victimmodel=new mongoose.model("victimdetails",schema);

module.exports=victimmodel;