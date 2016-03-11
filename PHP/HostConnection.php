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

    public function Registration($host, $login, $password)
    {
        $token = rand(100000, 999999);

        setcookie("login", $login, time() + 3600 * 24, '/', false, false);
        setcookie("token", $token, time() + 3600 * 24, '/', false, false);

        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $query = "INSERT INTO userstable (login, password, token) VALUES ('$login', '$password', $token)";
        $connection->query($query);

        mysqli_close($connection);
        return $token;
    }

    public function LogOut($host, $login)
    {
        $r1 = setcookie("login", null, -1, '/');
        $r2 = setcookie("token", null, -1, '/');

        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $query = "UPDATE userstable SET token=0 WHERE login='$login'";
        $connection->query($query);

        mysqli_close($connection);


        return ($r1 & $r2);
    }

    public function LogIn($host, $login, $password)
    {
        $token = rand(100000, 999999);

        setcookie("login", $login, time() + 3600 * 24, '/', false, false);
        setcookie("token", $token, time() + 3600 * 24, '/', false, false);

        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $query = "SELECT * FROM userstable WHERE login='$login' AND password='$password'";
        $result = $connection->query($query);
        if ($result->num_rows <= 0) {
            return false;
        }

        $query = "UPDATE userstable SET token=$token WHERE login='$login'";
        $connection->query($query);

        mysqli_close($connection);
        return true;
    }

    public function AddMassage($host, $login, $message)
    {
        $token = rand(100000, 999999);

        setcookie("login", $login, time() + 3600 * 24, '/', false, false);
        setcookie("token", $token, time() + 3600 * 24, '/', false, false);

        $connection = mysqli_connect($host[0], $host[1], $host[2], $host[3]) or die (json_encode("Error " . mysqli_error($connection)));
        $connection->query('SET NAMES utf8');

        $date = date("Y-m-d");

        $query = "INSERT INTO recordsTable (autorName, date, text) VALUES ('$login', '$date', '$message')";
        $connection->query($query);

        mysqli_close($connection);
        return $token;
    }
}