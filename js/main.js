$(document).ready(function(e) {    
	bindElements();
});

	


function bindElements() {
	$(document).on("click", "#login_button", login);
	$(document).on("click", "#register", register);
	$(document).on("click", "#info_button", info);
	$(document).on("click", "#expenditureButton", expenditure);
	$(document).on("click", "#gear_home_button", gear_home_button);
	
}

function login()
{
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$("#loading").css("display","none");
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
		$("#loading").css("display","none");
		if(response.success != null) 
		{
			successMsg = response.success;
			alert(successMsg);
			var user_id = response.email_id;
			localStorage.setItem("user_id", user_id);
			window.location.href = "info.html";
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

function info()
{
	var annualIncome = $('#income').val();	
	var payFrequency = $('#frequency').val();
	var payCheck = $('#pay_check').val();
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$("#loading").css("display","none");
		if(response.success != null) 
		{
			successMsg = response.success;
			alert(successMsg);
			window.location.href="main.html";
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
	jsonHelper.infoUser(JSON_CONSTANTS.POST, '#infoForm' , success, failed);
	
}

function expenditure()
{
	
	var amount = $('#input_amount').val();	
	var description = $('#input_description').val();
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$("#loading").css("display","none");
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
	jsonHelper.expenditure(JSON_CONSTANTS.POST, '#expenditureForm' , success, failed);
	
	
}



function getInfo()
{
	var success = function(response) 
	{
		response = JSON.parse(response);
		console.log(JSON.stringify(response));
		var annualIncome = response[0].annualIncome;
		var payFrequency = response[0].payFrequency;
		var payCheck = response[0].payCheck;
		
		var cal_values = calculate(annualIncome,payFrequency,payCheck);
		
		if(annualIncome%1 == 0){
			annualIncome = parseInt(annualIncome).toFixed(2);
		}
		if(cal_values.daily%1 == 0){
			cal_values.daily = parseInt(cal_values.daily).toFixed(4);
		}
		
		$("#salary_span").text(CommaFormatted(annualIncome));
		$("#taxHome_span").text(CommaFormatted(cal_values.takeHome.toFixed(2)));
		$("#tax_span").text(((cal_values.tax)*100).toFixed(4));
		$("#second_span").text(CommaFormatted(cal_values.second.toFixed(4)));
		$("#minute_span").text(CommaFormatted(cal_values.minute.toFixed(4)));
		$("#hourly_span").text(CommaFormatted(cal_values.hourly.toFixed(4)));
		$("#daily_span").text(CommaFormatted(cal_values.daily));

		
    } 
	
	var failed = function(response) {
		alert('failed');
		console.log(JSON.stringify(response));
	}
	
	var jsonHelper = new ServiceHelper();
	jsonHelper.getInfo(JSON_CONSTANTS.GET, success, failed);

}

function gear_home_button()
{
	window.location.href="main.html";
}

function getTotalExpenditure()
{	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$('#totalExpenditure').text(response.totalExpenditure);
		$('#expenditureCount').text(response.expenditureCount);
    } 
	
	var failed = function(response) {
		alert('failed');
		console.log(JSON.stringify(response));
	}
	
	var jsonHelper = new ServiceHelper();
	jsonHelper.totalExpenditure(JSON_CONSTANTS.GET, success, failed);
	
	
}



function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function CommaFormatted(amount)
{
	var delimiter = ","; // replace comma if desired
	amount = new String(amount);
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}