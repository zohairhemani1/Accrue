<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $annualIncome = $_POST['annualIncome'];
	 $payFrequency = $_POST['payFrequency'];
	 $payCheck = $_POST['payCheck'];
	 $user_id = $_GET['user_id'];
	 
	 
	 $query = "SELECT * FROM info WHERE email_id = '$user_id'";
	 $result = mysqli_query($con,$query);
	 $count = mysqli_num_rows($result);
	 
	 
	 if($count==0)
	 {
		 $query ="INSERT INTO info(email_id,annualIncome,payFrequency,payCheck)VALUES('$user_id','$annualIncome','$payFrequency','$payCheck')";
		 $result = mysqli_query($con,$query) or die ("Couldn’t insert query.");
		 $returnArray['success'] = "Info Inserted"; 
	 }
	 else
	 {
		 $query ="UPDATE `info` SET `annualIncome`= '$annualIncome',`payFrequency`= '$payFrequency',`payCheck`= '$payCheck' WHERE email_id = '$user_id'";
		 $result = mysqli_query($con,$query) or die ("Couldn’t update query.");
		 $returnArray['success'] = "Info Updated"; 
	 }
	 
	 
	
	
	 
	 echo json_encode($returnArray);
			 
			
?>