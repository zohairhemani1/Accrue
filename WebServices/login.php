<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $email = $_POST['email'];
	 $pass = $_POST['password'];
	 
	 $query = "SELECT * from users WHERE email like '$email' AND password like '$pass'";
	 $result = mysqli_query($con,$query);
	 $count = mysqli_num_rows($result);
	 
	 
	 if($count == 1)
	 {
		  $returnArray['success'] = "Login Successfully";
	 }
	 else
	 {
		 $returnArray['error'] = 'Wrong Credentials';
	 }
	 
	 echo json_encode($returnArray);
			 
			
?>