<?php


namespace App\Controller;


class SessionController extends BaseController {


    public function login() {
        //nothing required
    }


    public function logout() {
        $this->requireLogin();
    }


    public function update() {
        $this->requireLogin();
    }


    public function isLoggedIn() {
        $this->requireLogin();
    }


    public function deleteSession() {
        $this->requireLogin();
    }
}