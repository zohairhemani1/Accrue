$(document).ready(function(e) {    
	bindElements();
});

	


function bindElements() {
	$(document).on("click", "#login", login);
	$(document).on("click", "#register", register);
}

function login()
{
	alert('Login');
}

function register()
{
	
	alert('Register');
	
	var email = $('#email').val();	
	var pass = $('#password').val();
	var verifyPass = $('#verifyPassword').val();
	
	
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		if(response.success != null) 
		{
			successMsg = response.success;
			alert(successMsg);
		}
		else {
			//
			successMsg = response.error;
			alert(successMsg);
		}
    } 
	
	var failed = function(response) {
		alert('failed');
		console.log(JSON.stringify(response));
	}
	
	if(pass == verifyPass){
		var jsonHelper = new ServiceHelper();
		jsonHelper.registerUser(JSON_CONSTANTS.POST, '#registerForm' , success, failed);
		
	}
	else{
		alert('Password Doesnot Match!');
	}
	
		
	
	
	
}