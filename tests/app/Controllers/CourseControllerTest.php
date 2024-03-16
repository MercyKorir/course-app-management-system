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

    public function testCreateCourse()
    {
        $tempFile = tempnam(sys_get_temp_dir(), 'test');
        file_put_contents($tempFile, 'This is a test image');
    
        $_FILES['course_image'] = [
            'name' => 'test.jpeg',
            'type' => 'image/jpeg',
            'tmp_name' => $tempFile,
            'error' => 0,
            'size' => filesize($tempFile)
        ];

        $requestBody = [
            'title' => 'Test Course Title',
            'long_description' => 'This is a test course with a long description',
            'short_description' => 'Test course with a short description'
        ];

        $this->request->setBody($requestBody);
        $this->request->withMethod('post');

        $result = $this->withURI('http://localhost:8080/course')->withRequest($this->request)->controller(Course::class)->execute('create');
        var_dump($result->response()->getBody());
        $result->assertStatus(201);

        $expectedId = $this->courseModel->getInsertID();

        $result->assertJSON(json_encode(
            [
                'status' => 201,
                'error' => null,
                'message' => [
                    'success' => 'Course created successfully'
                ],
                'data' => [
                    'course_id' => $expectedId,
                    'title' => 'Test Course Title',
                    'long_description' => 'This is a test course with a long description',
                    'short_description' => 'Test course with a short description',
                    'course_image' => 'test.jpeg'
                ]
            ]
        ));

        $this->assertFileExists(WRITEPATH . 'assets/uploads/test.jpeg');

        unlink($tempFile);
    }
}
