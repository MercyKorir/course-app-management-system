<?php

namespace Tests\App\Models;

use CodeIgniter\Test\CIUnitTestCase;
use App\Models\CourseModel;

class CourseModelTest extends CIUnitTestCase
{
    protected $seed = 'CourseSeeder';
    protected $refresh = true;
    protected $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new CourseModel();
    }

    public function testInsertCourse()
    {
        $data = [
            'title' => 'Introduction to Programming',
            'long_description' => 'Learn the fundamentals of programming...',
            'short_description' => 'Programming basics',
            'course_image' => 'intro_programming.jpg',
        ];

        $this->model->save($data);
        $insertedCourse = $this->model->where('title', $data['title'])->first();

        $this->assertIsArray($insertedCourse);
        $this->assertArrayHasKey('course_id', $insertedCourse);
        $this->assertEquals($data['title'], $insertedCourse['title']);
        $this->assertEquals($data['long_description'], $insertedCourse['long_description']);
        $this->assertEquals($data['short_description'], $insertedCourse['short_description']);
        $this->assertEquals($data['course_image'], $insertedCourse['course_image']);
    }

    public function testUpdateCourse()
    {
        $course = $this->model->findAll()[0];
        $course['title'] = 'Advanced Programming';

        $this->model->save($course);
        $updatedCourse = $this->model->find($course['course_id']);

        $this->assertEquals('Advanced Programming', $updatedCourse['title']);
    }

    public function testDeleteCourse()
    {
        $course = $this->model->findAll()[0];
        $this->model->delete($course['course_id']);

        $deletedCourse = $this->model->find($course['course_id']);
        $this->assertNull($deletedCourse);
    }
}
