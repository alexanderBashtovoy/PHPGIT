<?php
class Host{

    private static $localHost = ["localhost", "root", "", "usersdb"];
    private static $serverHost = ["localhost", "user", "12345", "mynorthwind"];

    static function getLocal(){
        return self::$localHost;
    }

    static function getServer(){
        return self::$serverHost;
    }
}