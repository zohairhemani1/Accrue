function ServiceHelper() {
	
this.httpRequest = function (request_url, type, formID, dataType , succesCallBack, errorCallBack, bool) {
    	
		var postData = $(formID).serializeArray();
		alert(postData);
		
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
	
}
