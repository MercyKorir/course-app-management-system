<?php

namespace Tests\App\Controllers;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTestTrait;
use App\Models\CourseModel;
use CodeIgniter\HTTP\URI;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\Response;
use Config\App;

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
        $result = $this->controller(\App\Controllers\Course::class, 'getCourse')
            ->execute('getCourses');

        $this->assertTrue($result->isOK());
        $this->assertEquals(200, $result->getStatusCode());
    }

    public function testShowImage()
    {
        $image_name = 'test_image.jpg';
        $imagePath = WRITEPATH . 'uploads/' . $image_name;
        file_put_contents($imagePath, 'Test Image');

        $controller = $this->controller(\App\Controllers\Course::class, 'showImage');
        $result = $controller->execute('showImage', $image_name);

        $this->assertTrue($result->isOK());
        $this->assertEquals(200, $result->getStatusCode());

        unlink($imagePath);
    }

    public function testCreate()
    {
        $imagePath = WRITEPATH . 'uploads/test_image.jpg';
        file_put_contents($imagePath, 'Test Image');

        $files = [
            'course_image' => new \CodeIgniter\HTTP\FileUploadedFile(
                $imagePath,
                'test_image.jpg',
                'image/jpeg',
                null,
                true
            ),
        ];

        $data = [
            'title' => 'Test Course',
            'long_description' => 'This is a test course',
            'short_description' => 'Test course description',
        ];

        $controller = $this->controller(\App\Controllers\Course::class, 'create');
        $result = $controller->withRequest(new IncomingRequest((new App()), new Response(), new URI()))
            ->withUploadedFiles($files)
            ->execute('create', $data);

        $this->assertTrue($result->isOK());
        $this->assertEquals(201, $result->getStatusCode());

        unlink($imagePath);
    }

    public function testUpdate()
    {
        $course = $this->courseModel->findAll()[0];
        $course['title'] = 'Updated Course Title';

        $controller = $this->controller(\App\Controllers\Course::class, 'update');
        $result = $controller->withRequest(new IncomingRequest((new App()), new Response(), new URI()))
            ->execute('update', $course['course_id'], $course);

        $this->assertTrue($result->isOK());
        $this->assertEquals(200, $result->getStatusCode());
    }

    public function testDelete()
    {
        $course = $this->courseModel->findAll()[0];

        $controller = $this->controller(\App\Controllers\Course::class, 'delete');
        $result = $controller->execute('delete', $course['course_id']);

        $this->assertTrue($result->isOK());
        $this->assertEquals(200, $result->getStatusCode());
    }
}
