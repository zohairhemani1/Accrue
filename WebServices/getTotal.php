<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $user_id = $_GET['user_id'];
	 
	 $query = "SELECT sum(`amount`) AS sum FROM `expenditure` group by `email_id` HAVING `email_id` = '$user_id'";
	 $result = mysqli_query($con,$query);
	 $row = mysqli_fetch_assoc($result);
	 $totalExpenditure = $row['sum'];
	 
	 $returnArray['totalExpenditure'] = $totalExpenditure;
	 
	 echo json_encode($returnArray);
?>