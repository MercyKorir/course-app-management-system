<?php

namespace Tests\App\Controllers;

use App\Controllers\Course;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;
use App\Models\CourseModel;
// use CodeIgniter\HTTP\Files\UploadedFile;

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
        $courseId = 6;
        $result = $this->withURI('http://localhost:8080/course/' . $courseId)->controller(Course::class)->execute('show', $courseId);
        $result->assertStatus(200);

        $expectedData = $this->courseModel->find($courseId);

        if ($expectedData) {
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
        } else {
            $result->assertJSON(json_encode(
                [
                    'status' => 404,
                    'error' => null,
                    'message' => [
                        'error' => 'Course not found'
                    ],
                    'data' => null
                ]
            ));
        }
    }

    // public function testCreateCourse()
    // {
    //     $tempFile = tempnam(sys_get_temp_dir(), 'test');
    //     file_put_contents($tempFile, 'This is a test image');

    //     $file = new UploadedFile(
    //         $tempFile,
    //         'test.jpeg',
    //         'image/jpeg',
    //         filesize($tempFile),
    //         null,
    //         true
    //     );

    //     $requestBody = [
    //         'title' => 'Test Course Title',
    //         'long_description' => 'This is a test course with a long description',
    //         'short_description' => 'Test course with a short description'
    //     ];

    //     $this->request->withMethod('post');
    //     $this->request->setHeader('Content-Type', 'multipart/form-data');

    //     $this->request->setGlobal('post', $requestBody);

    //     $this->request->setGlobal('files', ['course_image' => $file]);

    //     $result = $this->withURI('http://localhost:8080/course')->withRequest($this->request)->controller(Course::class)->execute('create');
    //     var_dump($result->response()->getBody());
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
    //                 'title' => 'Test Course Title',
    //                 'long_description' => 'This is a test course with a long description',
    //                 'short_description' => 'Test course with a short description',
    //                 'course_image' => 'test.jpeg'
    //             ]
    //         ]
    //     ));

    //     $this->assertFileExists(WRITEPATH . 'assets/uploads/test.jpeg');

    //     unlink($tempFile);
    // }

    public function testDeleteCourse()
    {
        $nonExistentCourseId = 100;
        $result = $this->withURI('http://localhost:8080/course/' . $nonExistentCourseId)->controller(Course::class)->execute('delete', $nonExistentCourseId);
        $result->assertStatus(404);
        $result->assertJSON(json_encode(
            [
                'status' => 404,
                'error' => null,
                'message' => [
                    'error' => 'Course not found'
                ],
                'data' => null
            ]
        ));

        $existingCourseId = 5;
        $existingCourse = $this->courseModel->find($existingCourseId);

        if ($existingCourse) {
            $result = $this->withURI('http://localhost:8080/course/' . $existingCourseId)->controller(Course::class)->execute('delete', $existingCourseId);
            $result->assertStatus(200);
            $result->assertJSON(json_encode(
                [
                    'status' => 200,
                    'error' => null,
                    'message' => [
                        'success' => 'Course deleted successfully'
                    ]
                ]
            ));

            $deletedCourse = $this->courseModel->find($existingCourseId);
            $this->assertNull($deletedCourse);
        } else {
            $result->assertStatus(404);
            $result->assertJSON(json_encode(
                [
                    'status' => 404,
                    'error' => null,
                    'message' => [
                        'error' => 'Course not found'
                    ],
                    'data' => null
                ]
            ));
        }
    }

    public function testUpdateCourse()
    {
        $nonExistentCourseId = 100;
        $result = $this->withURI('http://localhost:8080/course/' . $nonExistentCourseId)->controller(Course::class)->execute('update', $nonExistentCourseId);
        $result->assertStatus(404);
        $result->assertJSON(json_encode(
            [
                'status' => 404,
                'error' => null,
                'message' => [
                    'error' => 'Course not found'
                ],
                'data' => null
            ]
        ));

        $existingCourseId = 6;
        $existingCourse = $this->courseModel->find($existingCourseId);

        if ($existingCourse) {
            $requestData = [
                'title' => 'Updated Course Title',
                'long_description' => 'This is an updated course with a long description',
                'short_description' => 'Updated course with a short description'
            ];

            $this->request->withMethod('put');
            $this->request->setGlobal('request', $requestData);

            $result = $this->withURI('http://localhost:8080/course/' . $existingCourseId)->withRequest($this->request)->controller(Course::class)->execute('update', $existingCourseId);
            var_dump($result->response()->getBody());
            $result->assertStatus(200);
            $result->assertJSONFragment(
                [
                    'title' => 'Updated Course Title',
                    'long_description' => 'This is an updated course with a long description',
                    'short_description' => 'Updated course with a short description'
                ]
            );
        } else {
            $result->assertStatus(404);
            $result->assertJSON(json_encode(
                [
                    'status' => 404,
                    'error' => null,
                    'message' => [
                        'error' => 'Course not found'
                    ],
                    'data' => null
                ]
            ));
        }
    }
}
