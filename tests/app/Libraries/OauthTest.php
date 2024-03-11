<?php

namespace Tests\App\Libraries;

use CodeIgniter\Test\CIUnitTestCase;
use App\Libraries\Oauth;
use App\Libraries\CustomOauthStorage;
use OAuth2\Server;
use OAuth2\GrantType\UserCredentials;

class OauthTest extends CIUnitTestCase
{
    private $oauth;

    public function setUp(): void
    {
        parent::setUp();

        $this->oauth = new Oauth();
    }

    public function testInit()
    {
        $dsn = getenv('database.default.DSN');
        $username = getenv('database.default.username');
        $password = getenv('database.default.password');

        $storage = new CustomOauthStorage(['dsn' => $dsn, 'username' => $username, 'password' => $password]);
        $server = new Server($storage);
        $server->addGrantType(new UserCredentials($storage));

        $this->assertInstanceOf(Server::class, $this->oauth->server);
        $this->assertContainsOnlyInstancesOf(UserCredentials::class, $this->oauth->server->getGrantTypes());
    }
}
