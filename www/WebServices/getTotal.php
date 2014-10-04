<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $user_id = $_GET['user_id'];
	 
	 $query = "SELECT i.*, sum(`amount`) AS sum, count(*) AS count FROM `expenditure`, `info` i
	 				WHERE timestamp > DATE_ADD(NOW(), INTERVAL -24 HOUR) 
					group by `email_id` HAVING `email_id` = '$user_id'";
	
					
	 $result = mysqli_query($con,$query);
	 $row = mysqli_fetch_assoc($result);
	 $totalExpenditure = $row['sum'];
	 $totalCount = $row['count'];
	 
	 $returnArray['totalExpenditure'] = $totalExpenditure;
	 $returnArray['expenditureCount'] = $totalCount;
	 $returnArray['annualIncome'] = $row['annualIncome'];
	 $returnArray['payFrequency'] = $row['payFrequency'];
	 $returnArray['payCheck'] = $row['payCheck'];
	 
	 echo json_encode($returnArray);
?>