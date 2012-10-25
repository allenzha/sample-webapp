<?php


namespace App\Helper;

use App\Helper\EntityManager;

/**
 * Singleton class for evaluating, managing and accessing the current session
 */
class SessionManager {

    /**
     * Hide construct to enforce singleton pattern
     */
    private function __construct() {}

    /**
     * @var SessionManager singleton instance of this sessionManager
     */
    private static $_instance;


    /**
     * The authToken to use when trying to refresh session.
     * This may be null if there is no active session or
     * authToken wasn't set on request.
     *
     * @var String
     */
    private $_token = null;

    /**
     * True when the actual token-/session is already validated.
     *
     * @var bool
     */
    private $_isValidated = false;

    /**
     * @static
     * @return SessionManager instance of the sessionManager
     */
    public static function getInstance() {
        if(self::$_instance == null) {
            self::$_instance = new SessionManager();
        }
        return self::$_instance;
    }


    /**
     * The authtoken to use for future requests on this SessionManager
     *
     * @param $token String the token to use
     */
    public function setAuthToken($token) {
        $this->_token = $token;
        $this->_isValidated = false;
    }


    /**
     * Checks whether the user is logged in
     *
     * @return bool true if the current session is valid and the user is logged in
     */
    public function isLoggedIn() {
        $this->validate();

        //TODO: replace this dummy code by usefull code :)
        return $this->_token == '123';
    }


    /**
     * Invalidates the active session and sets the authToken to null
     */
    public function invalidate() {
        $this->_token = null;
        $this->_isValidated = false;
    }


    /**
     * Validates (if not already done) the actual session by using
     * the token set by setAuthToken() before
     *
     * @return void
     */
    public function validate() {
        if ($this->_isValidated) {
            //already validated
            return;
        }

        if (! $this->_token) {
            throw new \Exception("Auth-token missing... ignoring request!");
        }


        $em = EntityManager::getInstance();
        $session = $em->find('App\Entities\UserSession', $this->_token);

        if ($session == null) {
            //not even found this session
            //TODO: do something here (clear old persisted session)
        } else {
            //TODO: load/persist session
        }

        $this->_isValidated = true;
    }

}
