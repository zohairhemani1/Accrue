<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $email = $_POST['email'];
	 $pass = $_POST['password'];
	 
	 $query = "SELECT * from users WHERE email like '$email'";
	 $result = mysqli_query($con,$query);
	 $count = mysqli_num_rows($result);
	 
	 
	 if($count == 0)
	 {
		  $query ="INSERT INTO users(email,password)VALUES('$email','$pass')";
		  $result = mysqli_query($con,$query)
			or die ("Couldn’t execute query.");
		  $returnArray['success'] = "User Registered";
		  
		  	/* getting user_id */
			
		     $query = "SELECT * from users WHERE email like '$email' AND password like '$pass'";
			 $result = mysqli_query($con,$query);
			 $count = mysqli_num_rows($result);
			 
			 
			 if($count == 1)
			 {
				  $row = mysqli_fetch_array($result);
				  $email_id = $row['id'];
				  $returnArray['email_id'] = $email_id;
			 }
				  
		  
		  
	 }
	 else
	 {
		 $returnArray['error'] = 'Email already in use.';
	 }
	 
	 echo json_encode($returnArray);
			 
			
?>