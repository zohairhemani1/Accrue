<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $annualIncome = $_POST['annualIncome'];
	 $payFrequency = $_POST['payFrequency'];
	 $payCheck = $_POST['payCheck'];
	 $user_id = $_GET['user_id'];
	 
	 
	 $query ="INSERT INTO info(email_id,annualIncome,payFrequency,payCheck)VALUES('$user_id','$annualIncome','$payFrequency','$payCheck')";
	 $result = mysqli_query($con,$query) or die ("Couldn’t execute query.");
	 $returnArray['success'] = "Info Recorded";
	
	 
	 echo json_encode($returnArray);
			 
			
?>