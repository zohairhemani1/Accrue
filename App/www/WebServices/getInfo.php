<?php
	
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');		

include 'headers/connect_database.php';      
	
	 $returnArray = array();
	 $user_id = $_GET['user_id'];
	 
	 $query = "SELECT * FROM `info` i, `users` u WHERE i.email_id = u.id AND u.id='$user_id' LIMIT 1";
	 $result = mysqli_query($con,$query);
	 
	 while($row = mysqli_fetch_assoc($result))
	 {
		 $returnArray[] = $row;
	 }
	 	echo json_encode($returnArray);
?>