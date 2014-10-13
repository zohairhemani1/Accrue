<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $user_id = $_GET['user_id'];
	 
	 $query = "select i.*, ifnull(sum(amount),0) as sum, CASE
        WHEN count('e.id') = 1 AND isnull(sum(amount)) THEN 0 ELSE count('e.id') END AS count from info i 
				left outer join expenditure e on e.email_id = i.email_id 
				where i.email_id = '$user_id'
				group by i.email_id";
	
					
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