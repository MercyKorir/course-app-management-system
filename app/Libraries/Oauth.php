<?php

namespace App\Libraries;

// use \OAuth2\Storage\Pdo;
use \App\Libraries\CustomOauthStorage;

class Oauth
{
    var $server;

    function __construct()
    {
        try {
            $this->init();
        } catch (\Exception $e) {
            log_message('error', $e->getMessage());
            die($e->getMessage());
        }
    }

    /**
     * Initialize the OAuth2 server
     */
    public function init()
    {
        $dsn = getenv('database.default.DSN');
        $username = getenv('database.default.username');
        $password = getenv('database.default.password');

        $storage = new CustomOauthStorage(array('dsn' => $dsn, 'username' => $username, 'password' => $password));
        $this->server = new \OAuth2\Server($storage);
        $this->server->addGrantType(new \OAuth2\GrantType\UserCredentials($storage));
    }
}
