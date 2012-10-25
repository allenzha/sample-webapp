<?php
// bootstrap.php



require "vendor/autoload.php";

if (!class_exists("Doctrine\Common\Version", false)) {
    require_once "bootstrap_doctrine.php";
}


