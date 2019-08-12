<?php
$dir    = '../LocalImages';
/*
$files1 = scandir($dir);
// $files2 = scandir($dir, 1);
$scanned_directory = array_diff(scandir($dir), array('..', '.'));//this removes  ".", ".." from the directory 
print_r($files1);
print_r($scanned_directory); 
// print_r($files2);

$result = array();
foreach ($files1 as $key => $value) 
   { 
      if (!in_array($value,array(".",".."))) 
      { 
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
         { 
            $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
         } 
         else 
         { 
            $result[] = $value; 
         } 
      } 
   } 
   print_r($result);
   */
  $files1 = scandir($dir);

  
?>
