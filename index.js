// to do 
// []create home page
// [x]make error page look similar
// [x]handling error
// [x]add meta tag
// []add loging 
// []add auth
// []




//node modules
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");


//routers

const loginrouter=require("./routes/login");
const adminrouter=require("./routes/admin");
const apirouter=require("./api/api");
const storedetailsrouter=require("./routes/storedetails")
const dbConnect=require("./dbconnect");

const app=new express()

//middleware's

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



// setting value
app.set("view engine" ,"ejs");
app.set("views","./views");

let port=process.env.PORT || 3000;

//connecting to db
async function d() {
	await dbConnect();
}
d();

//routing

app.use("/public",express.static(path.join(__dirname+"/public")));
app.use("/api",apirouter);
app.use("/login",loginrouter);
app.use("/admin",adminrouter);
app.use("/token",storedetailsrouter);


app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname+"/public/index.html"));
})


//404 page 
app.get("/*",(req,res)=>{
	res.send("<h1>404 Not Found</h1>");
})

process.on("uncaughtException",()=>{
	//close the db 
	

})
app.listen(port,"192.168.42.68",()=>{console.log("server started")});


