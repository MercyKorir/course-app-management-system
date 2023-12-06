<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                'type'           => 'INT',
                'constraint'     => 20,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'firstname'       => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'lastname'       => [
                'type'       => 'VARCHAR',
                'constraint' => 100,
            ],
            'email'       => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],
            'password'       => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
            ],

            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
