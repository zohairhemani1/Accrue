<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $amount = $_POST['amount'];
	 $description = $_POST['description'];
	 $user_id = $_GET['user_id'];
	 
     $query ="INSERT INTO expenditure(email_id,amount,description)VALUES('$user_id','$amount','$description')";
     $result = mysqli_query($con,$query)
		or die ("Couldn’t execute query.");
     $returnArray['success'] = "Expenditure Recorded.";
	
	 echo json_encode($returnArray);
			 
			
?>