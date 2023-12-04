<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class OauthRefreshTokens extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'refresh_token' => [
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
            'expires' => [
                'type' => 'TIMESTAMP',
                'null' => false,
            ],
            'scope' => [
                'type' => 'VARCHAR',
                'constraint' => 4000,
                'null' => true,
            ],
        ]);
        $this->forge->addKey('refresh_token', true);
        $this->forge->createTable('oauth_refresh_tokens');
    }

    public function down()
    {
        $this->forge->dropTable('oauth_refresh_tokens');
    }
}
