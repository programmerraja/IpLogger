
//handling GET /login
function getHandler(req,res) {
	if(res.app.locals.error_msg)
	{
		res.render("login",{error_msg:res.app.locals.error_msg});
		res.app.locals.error_msg="";
		return;
	}
	res.render("login",{error_msg:""});
}

module.exports={getHandler};