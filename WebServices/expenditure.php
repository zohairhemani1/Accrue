<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $email = $_POST['email'];
	 $amount = $_POST['amount'];
	 $description = $_POST['description'];
	 
     $query ="INSERT INTO expenditure(email,amount,description)VALUES('$email','$amount','$description')";
     $result = mysqli_query($con,$query)
		or die ("Couldn’t execute query.");
     $returnArray['success'] = "Expenditure Recorded.";
	
	 echo json_encode($returnArray);
			 
			
?>