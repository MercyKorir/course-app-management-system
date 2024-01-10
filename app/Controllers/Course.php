<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CourseModel;

class Course extends ResourceController
{
    protected $courseModel;

    public function __construct()
    {
        $this->courseModel = new CourseModel();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $courses = $this->courseModel->findAll();
            if (!$courses) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'message' => [
                        'error' => 'No courses found'
                    ],
                    'data' => $courses
                ];
                return $this->respond($response);
            }
            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Courses retrieved successfully'
                ],
                'data' => $courses
            ];
            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while retrieving courses: ' . $e->getMessage());
            return $this->failServerError('An error occurred while retrieving courses' . $e->getMessage());
        }
    }

    /**
     * Handle OPTIONS request
     * 
     * @return mixed
     */
    public function options()
    {
        $this->response
            ->setHeader('Access-Control-Allow-Origin', '*')
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
            ->setHeader('Access-Control-Allow-Headers', 'X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization');

        return $this->response->setStatusCode(200); // Respond with 200 OK for OPTIONS request
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        try {
            $course = $this->courseModel->find($id);
            if (!$course) {
                return $this->failNotFound('Course with ID ' . $id . ' not found');
            }
            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Course retrieved successfully'
                ],
                'data' => $course
            ];
            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while retrieving course: ' . $e->getMessage());
            return $this->failServerError('An error occurred while retrieving course' . $e->getMessage());
        }
    }


    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        try {
            $rules = [
                'title' => 'required|min_length[3]|max_length[255]',
                'long_description' => 'required|min_length[3]',
                'short_description' => 'required|min_length[3]',
                'course_image' => 'uploaded[course_image]|max_size[course_image,1024]|is_image[course_image]|mime_in[course_image,image/jpg,image/jpeg,image/gif,image/png]'
            ];


            if (!$this->validate($rules)) {
                return $this->fail($this->validator->getErrors());
            }
            $file = $this->request->getFile('course_image');

            if (!$file->isValid()) {
                return $this->fail($file->getErrorString() . '(' . $file->getError() . ')');
            }
            try {
                $file->move('../assets/uploads');
            } catch (\Exception $e) {
                log_message('error', 'An error ocurred while uploading course image: ' . $e->getMessage());
                return $this->failServerError('An error occurred while uploading course image' . $e->getMessage());
            }

            $data = [
                'title' => $this->request->getPost('title'),
                'long_description' => $this->request->getPost('long_description'),
                'short_description' => $this->request->getPost('short_description'),
                'course_image' => $file->getName(),
            ];

            $course_id = $this->courseModel->insert($data);
            $data['course_id'] = $course_id;
            $response = [
                'status' => 201,
                'error' => null,
                'message' => [
                    'success' => 'Course created successfully'
                ],
                'data' => $data
            ];
            return $this->respondCreated($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while creating course: ' . $e->getMessage());
            return $this->failServerError('An error occurred while creating course' . $e->getMessage());
        }
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        helper(['form', 'array']);
        try {

            $existing_course = $this->courseModel->find($id);
            if (!$existing_course) {
                return $this->failNotFound('Course with ID ' . $id . ' not found');
            }

            $rules = [
                'title' => 'required|min_length[3]|max_length[255]',
                'long_description' => 'required|min_length[3]',
                'short_description' => 'required|min_length[3]',
            ];

            $fileName = dot_array_search('course_image', $_FILES);
            if ($fileName != '') {
                $rules['course_image'] = 'uploaded[course_image]|max_size[course_image,1024]|is_image[course_image]|mime_in[course_image,image/jpg,image/jpeg,image/gif,image/png]';
            }

            // $requestData = $this->request->getRawInput();

            if (!$this->validate($rules)) {
                return $this->fail($this->validator->getErrors());
            }

            $requestData = [
                'title' => $this->request->getPost('title'),
                'long_description' => $this->request->getPost('long_description'),
                'short_description' => $this->request->getPost('short_description'),
            ];

            if ($fileName != '') {
                $file = $this->request->getFile('course_image');

                if (!$file->isValid()) {
                    return $this->fail($file->getErrorString() . '(' . $file->getError() . ')');
                }
                try {
                    $file->move('../assets/uploads');
                } catch (\Exception $e) {
                    log_message('error', 'An error ocurred while uploading course image: ' . $e->getMessage());
                    return $this->failServerError('An error occurred while uploading course image' . $e->getMessage());
                }
                $requestData['course_image'] = $file->getName();
            }


            $this->courseModel->update($id, $requestData);

            $updated_course = $this->courseModel->find($id);

            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Course updated successfully'
                ],
                'data' => $updated_course
            ];
            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while updating course: ' . $e->getMessage());
            return $this->failServerError('An error occurred while updating course' . $e->getMessage());
        }
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $existing_course = $this->courseModel->find($id);

        if (!$existing_course) {
            return $this->failNotFound('Course with ID ' . $id . ' not found');
        }

        $image_path = '../assets/uploads/' . $existing_course['course_image'];

        if (file_exists($image_path)) {
            unlink($image_path);
        }

        try {
            $this->courseModel->delete($id);
            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Course deleted successfully'
                ]
            ];
            return $this->respondDeleted($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while deleting course: ' . $e->getMessage());
            return $this->failServerError('An error occurred while deleting course' . $e->getMessage());
        }
    }

    /**
     * Return an array of course objects, themselves in array format
     * 
     * @return mixed
     */
    public function getCourses()
    {
        try {
            $courses = $this->courseModel->findAll();
            if (!$courses) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'message' => [
                        'error' => 'No courses found'
                    ],
                    'data' => $courses
                ];
                return $this->respond($response);
            }
            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Courses retrieved successfully'
                ],
                'data' => $courses
            ];
            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while retrieving courses: ' . $e->getMessage());
            return $this->failServerError('An error occurred while retrieving courses' . $e->getMessage());
        }
    }
}
