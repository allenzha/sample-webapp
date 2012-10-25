<?php


namespace App\Controller;

use \App\Helper\SessionManager;
use \Exception;

/**
 * Gets extended by all the other Controllers and provides
 * some helper Methods in order to ensure privileges or login.
 * These Methods will throw Exceptions if the user does not
 * have the required privileges and therefore will cause
 * the server to handle an errormessage back to the user.
 *
 * @TODO: Change the errorcodes to something more standard
 */
class BaseController {

    const LOGIN_REQUIRED = 123;
    const ADMIN_ACCESS_REQUIRED = 234;
    const READ_ACCESS_REQUIRED = 345;
    const WRITE_ACCESS_REQUIRED = 456;

    public function requireLogin() {
        $sm = SessionManager::getInstance();
        if (! $sm->isLoggedIn()) {
            throw new Exception("Login required for the requested method!", self::LOGIN_REQUIRED);
        }
    }

    public function requireAdminAccess() {
        $this->requireLogin();
        throw new Exception("Admin rights required for the requested method!", self::ADMIN_ACCESS_REQUIRED);
    }

    public function requireWriteAccess() {
        $this->requireLogin();

        throw new Exception("Write access required for the requested method!", self::WRITE_ACCESS_REQUIRED);
    }

    public function requireReadAccess() {
        $this->requireLogin();
        throw new Exception("Read access required for the requested method!", self::READ_ACCESS_REQUIRED);
    }

}
