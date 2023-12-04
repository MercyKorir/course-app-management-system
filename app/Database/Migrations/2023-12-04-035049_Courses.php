<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class Courses extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'course_id' => [
                'type'              => 'INT',
                'constraint'        => 20,
                'unsigned'          => true,
                'auto_increment'    => true,
            ],
            'title' => [
                'type'              => 'VARCHAR',
                'constraint'        => 255,
            ],
            // add image field here later
            'long_description' => [
                'type'              => 'TEXT',
                'null'              => true,
            ],
            'short_description' => [
                'type'              => 'TEXT',
                'null'              => true,
            ],
            'created_at' => [
                'type'              => 'DATETIME',
                'null'              => true,
                'default'           => new RawSql('CURRENT_TIMESTAMP'),
            ],
            'updated_at' => [
                'type'              => 'DATETIME',
                'null'              => true,
                'default'           => new RawSql('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            ],
        ]);
        $this->forge->addKey('course_id', true);
        $this->forge->createTable('courses');
    }

    public function down()
    {
        $this->forge->dropTable('courses');
    }
}
