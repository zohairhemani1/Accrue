function ServiceHelper() {
	
this.httpRequest = function (request_url, type, formID, dataType , succesCallBack, errorCallBack, bool) {
    	
		var postData = $(formID).serializeArray();
		//alert(postData);
		$("#loading").css("display","block");
		
		$.ajax({
    			url: request_url,
    			type: type,
				async:bool,
				data: postData,
    			success: function (response) {
                    console.log("success resp:");
                    succesCallBack(response);
                },  
               
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error: ");
					console.log(jqXHR + textStatus + errorThrown );
                }
               
    	
    	 });
		
			

    }

	this.registerUser = function(type, formID, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.REGISTER;
		this.httpRequest(url, type, formID, null, successCallBack, failedCallBack, true);
	}
	
	this.loginUser = function(type,formID,successCallBack, failedCallBack){
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.LOGIN;
		this.httpRequest(url, type, formID, null, successCallBack, failedCallBack, true);
	}
	this.infoUser = function(type,formID,successCallBack, failedCallBack){
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.INFO + APP_CONSTANTS.USER_ID_URL;
		this.httpRequest(url, type, formID, null, successCallBack, failedCallBack, true);
	}
	this.expenditure = function(type,formID,successCallBack, failedCallBack){
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.EXPENDITURE + APP_CONSTANTS.USER_ID_URL;
		this.httpRequest(url, type, formID, null, successCallBack, failedCallBack, true);
	}
	this.getInfo = function(type,successCallBack, failedCallBack){
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.GET_INFO + APP_CONSTANTS.USER_ID_URL;
		this.httpRequest(url, type, null, null, successCallBack, failedCallBack, true);
	}
	
	this.totalExpenditure = function(type,successCallBack, failedCallBack){
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.TOTAL_EXPENDITURE + APP_CONSTANTS.USER_ID_URL;
		this.httpRequest(url, type, null, null, successCallBack, failedCallBack, true);
	}
	
}
