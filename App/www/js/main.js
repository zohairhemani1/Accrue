$(document).ready(function(e) {    
	bindElements();
});

var rawAmount = "";

$('#input_amount').bind('keyup',function(evt){
	   var amount = $('#input_amount').val();
	   rawAmount = rawAmount + String.fromCharCode(evt.keyCode);
	   convertToFloat(rawAmount, evt, 2)
});


	


function bindElements() {
	$(document).on("click", "#login_button", login);
	//$(document).on("click", "#register", register());
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
			//alert(successMsg);
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
	
	var emailTrue = false;
	
	var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2 >= x.length) {
        alert("Not a valid e-mail address");
		emailTrue = true;
    }
	
	
	
	
	
	var fieldsFilled = false;
	
	if(email == "" || pass == "" || verifyPass == "")
	{
		fieldsFilled = false;
	}
	else
	{
		fieldsFilled = true;
	}
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$("#loading").css("display","none");
		if(response.success != null) 
		{
			successMsg = response.success;
			//alert(successMsg);
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
		if(fieldsFilled == true && emailTrue == false)
		{
			var jsonHelper = new ServiceHelper();
			jsonHelper.registerUser(JSON_CONSTANTS.POST, '#registerForm' , success, failed);
		}
		else
		{
			alert('Please fill all the fields.');
		}
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
			//alert(successMsg);
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
	
	if(annualIncome == "" || payCheck == "")
	{
		alert('Please fill all the fields');
	}
	else
	{
		var jsonHelper = new ServiceHelper();
		jsonHelper.infoUser(JSON_CONSTANTS.POST, '#infoForm' , success, failed);
	}
}

function expenditure()
{
	
	var amount = $('#input_amount').val();	
	var description = $('#input_description').val();
	
	convertToFloat(amount, this, 2);
	
	var success = function(response) 
	{
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		$("#loading").css("display","none");
		if(response.success != null) 
		{
			successMsg = response.success;
			window.location.href = "main.html";
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
	
	if(amount == "" || description =="")
	{
		alert('Please fill all the fields.');
	}
	else
	{
		var jsonHelper = new ServiceHelper();
		jsonHelper.expenditure(JSON_CONSTANTS.POST, '#expenditureForm' , success, failed);
	}
	
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
		$("#daily_span").text(CommaFormatted(cal_values.daily.toFixed(4)));

		
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
	var date = new Date();
	var hours = date.getHours();
	var hours_24hour = hours;
	var AMorPM = "AM";
	var accruedPercentage;
	var seconds;

	if(hours > 12)
	{
		hours = hours - 12;
		AMorPM = "PM";
	}
	
	accruedPercentage = (((hours_24hour) + (date.getMinutes()/60)) / 24) * 100; // double check this minutes divide part
	
	var minutes = date.getMinutes();
	if(minutes<=9)
	{
		minutes = "0"+minutes;
	}
	
	var currentTime = hours + ":" + minutes+"" + AMorPM; 
	
	$('#myStat1').data('info', currentTime);
	
	seconds = (3600 * hours_24hour) + (minutes*60) + date.getSeconds();
	
	var success = function(response) 
	{
		
		response = JSON.parse(response);
		var successMsg;
		console.log(JSON.stringify(response));
		
		var totalExpenditure = response.totalExpenditure
		
		var annualIncome = response.annualIncome;
		var payFrequency = response.payFrequency;
		var payCheck = response.payCheck;
		var totalCount = response.expenditureCount;
		
		if(totalCount >=1)
		{
			$('#plus_image').css('display','none');
			$('#plusButton').html("<span class='countNumber'>" + totalCount + "</span>");
		}
		
		var calculateObj = calculate(annualIncome,payFrequency,payCheck)
	    
		
		var price = (calculateObj.second*seconds);
		
		var progressBar = false;
		var ii =0;
		setInterval(function(){
			
			var date_dynamic = new Date();
			var currentMinutes_dynamic = date_dynamic.getMinutes();
			
			if(currentMinutes_dynamic<=9)
			{
				currentMinutes_dynamic = "0"+currentMinutes_dynamic;
			}
					
			var currentTime = hours + ":" + currentMinutes_dynamic+"" + AMorPM;
			
			$('#time_txt').text(currentTime+"");
			price = price + calculateObj.second;
			
			var amountInRedPercentage = (response.totalExpenditure / (calculateObj.second*seconds)  *100).toFixed(2);
			
			accruedPercentage = Math.ceil(accruedPercentage);
			
			$('#myStat1').data('percent', accruedPercentage);
			
			if((((accruedPercentage ) - ((accruedPercentage /100)*amountInRedPercentage)).toFixed(0)) <= -1)
			{
				$('#myStat1').data('bpercent', 2);
			}
			else
			{
				$('#myStat1').data('bpercent', ((accruedPercentage ) - ((accruedPercentage /100)*amountInRedPercentage)).toFixed(0));
			}
		
			$("#myStat1").css("display","block");
			
			if(progressBar == false)
			{
				$('#myStat1').circliful();	
				progressBar = true;
			}
			var dollars = Math.floor(price);
			var cents = ((price - Math.floor(price))*100).toFixed(0);
			var formatedPrice = "<div><span id='dollars'>$"+dollars+"</span>.<span id='cents'>"+cents+"</span></div>";
			$('.circle-text').empty();
			$('.circle-text').append(formatedPrice);
			
			
	},1000);
		
			
		
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


function convertToFloat(obj, evt, decimal) {

	var value = obj.replace(/[^0-9.]/g,'');
	var ascii = evt.which;
	
	//alert('value:' + value);
	//alert('ascii: ' + ascii);
	var convertedNum = parseFloat(value);
	
	if (ascii == 8) 
	{ 	//backspace
	  	//convertedNum = 0;
		//rawAmount = "";
		if (value == 0) 
		{
			convertedNum = 0;
		} 
		else 
		{
			//$('#input_amount').val();
			convertedNum = ($('#input_amount').val()/10);
			
		}
		// ascii codes between 48 and 57 are numbers
		//don't react to other keyboard inputs
		
	}
	 
	else if (ascii >= 48 && ascii <= 57) 
	{
		convertedNum = value/100;
	}
	
	$('#input_amount').val(convertedNum.toFixed(2));
	
	obj  = convertedNum.toFixed(decimal);
	
	return;
	
}



