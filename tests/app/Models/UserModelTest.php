<?php

namespace Tests\App\Models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Models\UserModel;

class UserModelTest extends CIUnitTestCase
{
    protected $seed = 'UserSeeder';
    protected $refresh = true;
    protected $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new UserModel();
    }

    public function testInsertUser()
    {
        $data = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
        ];

        $this->model->save($data);
        $insertedUser = $this->model->where('email', $data['email'])->first();

        $this->assertIsArray($insertedUser);
        $this->assertArrayHasKey('id', $insertedUser);
        $this->assertEquals($data['firstname'], $insertedUser['firstname']);
        $this->assertEquals($data['lastname'], $insertedUser['lastname']);
        $this->assertEquals($data['email'], $insertedUser['email']);
        $this->assertTrue(password_verify($data['password'], $insertedUser['password']));
    }

    public function testUpdateUser()
    {
        $user = $this->model->findAll()[0];
        $user['firstname'] = 'Jane';
        $user['password'] = 'newpassword123';

        $this->model->save($user);
        $updatedUser = $this->model->find($user['id']);

        $this->assertEquals('Jane', $updatedUser['firstname']);
        $this->assertTrue(password_verify('newpassword123', $updatedUser['password']));
    }

    public function testDeleteUser()
    {
        $user = $this->model->findAll()[0];
        $this->model->delete($user['id']);

        $deletedUser = $this->model->find($user['id']);
        $this->assertNull($deletedUser);
    }
}
