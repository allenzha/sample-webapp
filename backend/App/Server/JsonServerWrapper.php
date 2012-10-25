<?php


namespace App\Server;

use \App\Helper\SessionManager;
use \Lightbulb\Json\Rpc2\Server;

require_once realpath(__DIR__)."/Server.php";


/**
 * Use this Wrapper in order to setup and run a JsonRpcServer.
 * It encapsulates the \Lightbulb\Json\Rpc2\Server and adds
 * some app specific functionality (like extracting authToken
 * and initializing SessionManager).
 */
class JsonServerWrapper {

    /**
     * @var \Lightbulb\Json\Rpc2\Server holds the JSONRpc2 Server object
     */
    private $_server = null;

    /**
     * @var JSON holds the JsonRequest (excluding the authToken parameter)
     */
    private $_jsonRequest = null;

    /**
     * @var bool true if this JsonServerWrapper was already initialized by calling init()
     */
    private $_isInitialized = false;

    /**
     * Initializes the ServerWrapper. This means the request will be
     * parsed as json and the sessionManager is beeing initialized.
     * This method gets called automatically from run() if you have
     * not run this before. Also this method could only be called
     * once!
     *
     * @param String $requestString the string requested (or null if
     *               the request should be read from php://input)
     * @return void
     */
    public function init($requestString = null) {

        if ($this->_isInitialized) {
            //already initialized
            return;
        }

        //create new JSONRpc2 Server
        $this->_server = new Server();

        //add available service controllers to the server
        $this->addServiceControllers($this->_server);

        //retrieve the json request
        $json = $this->getRequestAsJSON($requestString);

        //extract authtoken from request
        $token = $this->extractAuthToken($json);

        //save json request
        $this->_jsonRequest = $json;

        //set up sessionManager instance and fill in authToken
        $sm = SessionManager::getInstance();
        $sm->setAuthToken($token);

        $this->_isInitialized = true;
    }

    public function run() {

        //force initialization
        if (!$this->_isInitialized) {
            $this->init();
        }

        //try to execute request
        try {
            $this->_server->handle($this->_jsonRequest);
        } catch (Exception $e) {
            //handle exception
            echo "Exception caught!\n$e\n";
        }
    }


    /**
     * Private Method for adding ServiceControllers to the server
     *
     * @param $server
     */
    private function addServiceControllers($server) {
        //add all service Controllers:
        $server->page = new \App\Controller\PageController();
        $server->session = new \App\Controller\SessionController();
        $server->tag = new \App\Controller\TagController();
    }


    /**
     * Extracts the authToken from the json request and returns it.
     * This will also remove this param from the paramlist.
     *
     * @param $json the json to parse and extract the token from
     * @return String the authtoken extracted or null if token was not set
     */
    private function extractAuthToken(&$json) {
        $token = null;
        if(isset($json->params) && isset($json->params->authToken)) {
            $token = $json->params->authToken;
            unset($json->params->authToken);
        }
        return $token;
    }


    /**
     * Reads and parses the JSONRequest
     *
     * @return JSON the parsed json request as json object
     */
    private function getRequestAsJSON($requestString = null) {


        if ($requestString == null) {
            $requestString = @file_get_contents('php://input');
        }
       return json_decode($requestString);
    }
}
