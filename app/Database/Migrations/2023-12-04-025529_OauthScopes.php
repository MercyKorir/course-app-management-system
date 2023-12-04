<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class OauthScopes extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'scope' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => false,
            ],
            'is_default' => [
                'type' => 'BOOLEAN',
                'null' => false,
                'default' => false,
            ],
        ]);
        $this->forge->addKey('scope', true);
        $this->forge->createTable('oauth_scopes');
    }

    public function down()
    {
        $this->forge->dropTable('oauth_scopes');
    }
}
