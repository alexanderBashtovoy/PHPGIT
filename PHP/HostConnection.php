<?php

class HostConnection
{
    public function getRecords($host)
    {
        //error_reporting(0);
        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $arr = [];
        $query = "SELECT * FROM recordsTable";
        $result = $connection->query($query);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $arr[] = $row;
            }
        }

        mysqli_close($connection);
        return $arr;
    }
}