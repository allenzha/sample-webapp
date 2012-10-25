<?php



namespace App\Helper;

class EntityManager {


    private static $_instance = null;

    public static function setEntityManagerInstance(\Doctrine\ORM\EntityManager $entityManager) {
        self::$_instance = $entityManager;
    }

    /**
     * @static
     * @return \Doctrine\ORM\EntityManager returns the current EntityManager
     */
    public static function getInstance() {
        return self::$_instance;
    }

}
