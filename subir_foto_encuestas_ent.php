<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Bogota");
error_reporting(0);
// determino el directorio donde quedarán las fotos..
try {
	$dir_fotos=$_SERVER['DOCUMENT_ROOT'].'/Fotos_ENT/fotos_enc';  // esta es la direccion base del servidor y la subcarpeta /fotos/
$dir_fotos2=$_SERVER['DOCUMENT_ROOT'].'/ARCHIVOS-ANDO/';
//echo $dir_fotos;
//die;
$file_name = $_FILES['image']['name'];
$file_size = $_FILES['image']['size'];
$file_tmp = $_FILES['image']['tmp_name'];
$file_type = $_FILES['image']['type'];

 $expensions = array("jpeg", "jpg", "png","pdf");

 $file_ext = strtolower(end(explode('.', $_POST['nombre'])));
 $ruta = str_replace(" ", "_", $_POST['ruta']);
 $imageData = $_POST['image'];
 $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
 $imageData = str_replace('data:image/jpg;base64,', '', $imageData);
 $imageData = str_replace(' ', '+', $imageData);
 $imageData = base64_decode($imageData);

$prop[0] = 1;
if (in_array($file_ext, $expensions) === false) {
     $result= "BADEXT";
   }
else {

	$saveAs=$_POST['nombre'];
	mkdir($dir_fotos.'/'.$ruta, 0777, true);
	file_put_contents($dir_fotos.'/'.$ruta.'/'.$saveAs, $imageData);
	$result= '/Fotos_ENT/fotos_enc'.'/'.$ruta.'/'.$saveAs;
	/*
	if(move_uploaded_file($_FILES["image"]["tmp_name"], )){
		$result= '/Fotos'.'/'.$ruta.'/'.$saveAs;
	}
	else{
		$errors= error_get_last();
		$result= 'ERROR'.$errors['message'];
	}*/
}
//echo($result);
//print_r(json_encode($result, JSON_UNESCAPED_UNICODE)); // para que no haya problema con las tildes
	print_r(json_encode($result));
} catch (\Throwable $th) {
	$result='error';
	print_r(json_encode($result));
}

?>