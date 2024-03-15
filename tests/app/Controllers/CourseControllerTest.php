<?php

namespace Tests\App\Controllers;

use App\Controllers\Course;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;
use App\Models\CourseModel;

class CourseControllerTest extends CIUnitTestCase
{
    use ControllerTestTrait;

    private $courseModel;

    public function setUp(): void
    {
        parent::setUp();
        $this->courseModel = new CourseModel();
    }

    public function tearDown(): void
    {
        parent::tearDown();
        unset($this->courseModel);
    }

    public function testGetCourses()
    {
        $result = $this->withURI('http://localhost:8080/courses')->controller(Course::class)->execute('getCourses');
        $result->assertStatus(200);

        $expectedData = $this->courseModel->findAll();

        $expectedData = array_map(function ($course) {
            return [
                'course_id' => $course['course_id'],
                'title' => $course['title'],
                'long_description' => $course['long_description'],
                'short_description' => $course['short_description'],
                'course_image' => $course['course_image'],
                'created_at' => $course['created_at'],
                'updated_at' => $course['updated_at']
            ];
        }, $expectedData);

        $result->assertJSON(json_encode(
            [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Courses retrieved successfully'
                ],
                'data' => $expectedData
            ]
        ));
    }

    public function testShowCourse()
    {
        $courseId = 5;
        $result = $this->withURI('http://localhost:8080/course/' . $courseId)->controller(Course::class)->execute('show', $courseId);
        $result->assertStatus(200);

        $expectedData = $this->courseModel->find($courseId);

        $expectedData = [
            'course_id' => $expectedData['course_id'],
            'title' => $expectedData['title'],
            'long_description' => $expectedData['long_description'],
            'short_description' => $expectedData['short_description'],
            'course_image' => $expectedData['course_image'],
            'created_at' => $expectedData['created_at'],
            'updated_at' => $expectedData['updated_at']
        ];

        $result->assertJSON(json_encode(
            [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Course retrieved successfully'
                ],
                'data' => $expectedData
            ]
        ));
    }

    // public function testCreateCourse()
    // {
    //     $_FILES['course_image'] = [
    //         'name' => 'test.jpg',
    //         'type' => 'image/jpeg',
    //         'tmp_name' => '/tmp/php7hj3jg',
    //         'error' => 0,
    //         'size' => 1000
    //     ];

    //     $_POST['title'] = 'Test Course';
    //     $_POST['long_description'] = 'This is a test course';
    //     $_POST['short_description'] = 'Test course';

    //     $result = $this->withURI('http://localhost:8080/course')->withRequest($this->request)->controller(Course::class)->execute('create');
    //     $result->assertStatus(201);

    //     $expectedId = $this->courseModel->getInsertID();

    //     $result->assertJSON(json_encode(
    //         [
    //             'status' => 201,
    //             'error' => null,
    //             'message' => [
    //                 'success' => 'Course created successfully'
    //             ],
    //             'data' => [
    //                 'course_id' => $expectedId,
    //                 'title' => 'Test Course',
    //                 'long_description' => 'This is a test course',
    //                 'short_description' => 'Test course',
    //                 'course_image' => 'test.jpg'
    //             ]
    //         ]
    //     ));

    //     $this->assertFileExists(('../assets/uploads/test.jpg'));
    // }
}
