<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class OauthUsers extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'username' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => false,
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => true,
            ],
            'first_name' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => true,
            ],
            'last_name' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => true,
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => true,
            ],
            'email_verified' => [
                'type' => 'BOOLEAN',
                'null' => false,
                'default' => false,
            ],
            'scope' => [
                'type' => 'VARCHAR',
                'constraint' => 4000,
                'null' => true,
            ],
        ]);
        $this->forge->addKey('username', true);
        $this->forge->createTable('oauth_users');
    }

    public function down()
    {
        $this->forge->dropTable('oauth_users');
    }
}
