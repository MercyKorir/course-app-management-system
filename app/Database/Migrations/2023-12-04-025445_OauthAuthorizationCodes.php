<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class OauthAuthorizationCodes extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'authorization_code' => [
                'type' => 'VARCHAR',
                'constraint' => 40,
                'null' => false,
            ],
            'client_id' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => false,
            ],
            'user_id' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => true,
            ],
            'redirect_uri' => [
                'type' => 'VARCHAR',
                'constraint' => 2000,
                'null' => true,
            ],
            'expires' => [
                'type' => 'TIMESTAMP',
                'null' => false,
            ],
            'scope' => [
                'type' => 'VARCHAR',
                'constraint' => 4000,
                'null' => true,
            ],
            'id_token' => [
                'type' => 'VARCHAR',
                'constraint' => 1000,
                'null' => true,
            ],
        ]);
        $this->forge->addKey('authorization_code', true);
        $this->forge->createTable('oauth_authorization_codes');
    }

    public function down()
    {
        $this->forge->dropTable('oauth_authorization_codes');
    }
}
