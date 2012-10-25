<?php


require_once "bootstrap.php";

$server = new \App\Server\JsonServerWrapper();

$server->init();
$server->run();
