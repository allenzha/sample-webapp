<?php
// bootstrap_doctrine.php
require_once 'vendor/doctrine/common/lib/Doctrine/Common/ClassLoader.php';

$classLoader = new \Doctrine\Common\ClassLoader('Doctrine\ORM', realpath(__DIR__ . '/vendor/doctrine/orm/lib'));
$classLoader->register();
$classLoader = new \Doctrine\Common\ClassLoader('Doctrine\DBAL', realpath(__DIR__ . '/vendor/doctrine/dbal/lib'));
$classLoader->register();
$classLoader = new \Doctrine\Common\ClassLoader('Doctrine\Common', realpath(__DIR__ . '/vendor/doctrine/common/lib'));
$classLoader->register();
$classLoader = new \Doctrine\Common\ClassLoader('Symfony\Console', realpath(__DIR__ . '/vendor/symfony/console'));
$classLoader->register();

//use Doctrine Classloader and add our own namespace:
$classLoader = new \Doctrine\Common\ClassLoader('App', realpath(__DIR__));
$classLoader->register();


// See :doc:`Configuration <../reference/configuration>` for up to date autoloading details.
use Doctrine\ORM\Tools\Setup;

require_once 'vendor/doctrine/orm/lib/Doctrine/ORM/Tools/Setup.php';
//Setup::registerAutoloadPEAR();

// Create a simple "default" Doctrine ORM configuration for XML Mapping
$isDevMode = true;
//$config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config/xml"), $isDevMode);
// or if you prefer yaml or annotations
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/App/Entities"), $isDevMode);
//$config = Setup::createYAMLMetadataConfiguration(array(__DIR__."/config/yaml"), $isDevMode);

// database configuration parameters
$conn = array(
    'driver' => 'pdo_sqlite',
    'path' => __DIR__ . '/db.sqlite',
);

// obtaining the entity manager
$entityManager = \Doctrine\ORM\EntityManager::create($conn, $config);

//and tell our globalEntity-Manager about it
\App\Helper\EntityManager::setEntityManagerInstance($entityManager);
