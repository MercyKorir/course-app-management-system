<?php

namespace Tests\App\Models;

use App\Models\CourseModel;
use CodeIgniter\Test\CIUnitTestCase;

class CourseModelTest extends CIUnitTestCase
{
    protected $courseModel;

    protected function setUp(): void
    {
        parent::setUp();
        $this->courseModel = new CourseModel();
    }

    public function testSaveCourse(): void
    {
        $data = [
            'title' => 'Test Course',
            'long_description' => 'This is a test course.',
            'short_description' => 'This is a short description of the test course.',
            'course_image' => 'test_course.jpg'
        ];

        $this->assertNull($this->courseModel->insert($data));

        $course = $this->courseModel->find(1);

        $this->assertEquals('Test Course', $course['title']);
        $this->assertEquals('This is a test course.', $course['long_description']);
        $this->assertEquals('This is a short description of the test course.', $course['short_description']);
        $this->assertEquals('test_course.jpg', $course['course_image']);
    }

    public function testFindCourseById(): void
    {
        $course = $this->courseModel->find(1);

        $this->assertIsArray($course);
        $this->assertArrayHasKey('course_id', $course);
        $this->assertArrayHasKey('title', $course);
        $this->assertArrayHasKey('long_description', $course);
        $this->assertArrayHasKey('short_description', $course);
        $this->assertArrayHasKey('course_image', $course);
    }

    public function testFindCourseByInvalidId(): void
    {
        $course = $this->courseModel->find(999);

        $this->assertNull($course);
    }

    public function testUpdateCourse(): void
    {
        $data = [
            'title' => 'Updated Test Course',
            'long_description' => 'This is an updated test course.',
            'short_description' => 'This is a short description of the updated test course.',
            'course_image' => 'updated_test_course.jpg',
        ];

        $this->assertTrue($this->courseModel->update(1, $data));

        $course = $this->courseModel->find(1);

        $this->assertEquals('Updated Test Course', $course['title']);
        $this->assertEquals('This is an updated test course.', $course['long_description']);
        $this->assertEquals('This is a short description of the updated test course.', $course['short_description']);
        $this->assertEquals('updated_test_course.jpg', $course['course_image']);
    }

    public function testDeleteCourse(): void
    {
        $this->assertTrue($this->courseModel->delete(1));

        $course = $this->courseModel->find(1);

        $this->assertNull($course);
    }
}
