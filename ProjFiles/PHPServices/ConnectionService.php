<?php

class GetConnectionService
{
    function getConnection()
    {
        $servername = "mysql4.gear.host";
        $username = "mmplayerdb";
        $password = "\$iva02071992mmplayer";
        $dbName = "mmplayerdb";
        $host = 3306;

        $conn = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
}

?>
