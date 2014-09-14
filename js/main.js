$(document).ready(function(e) {    
	bindElements();
});

	


function bindElements() {
	$(document).on("click", "#login_button", login);
	$(document).on("click", "#register", register);
}

function login()
{
	
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
			successMsg = response.error;
			alert(successMsg);
		}
    } 
	
	var failed = function(response) {
		alert('failed');
		console.log(JSON.stringify(response));
	}

	var jsonHelper = new ServiceHelper();
	jsonHelper.loginUser(JSON_CONSTANTS.POST, '#loginForm' , success, failed);
		
	
	
	
}

function register()
{
		
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