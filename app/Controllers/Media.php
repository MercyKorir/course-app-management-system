<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\MediaModel;

class Media extends ResourceController
{
    protected $mediaModel;

    public function __construct()
    {
        $this->mediaModel = new MediaModel();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $media = $this->mediaModel->findAll();
            if (!$media) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'message' => [
                        'No media found.'
                    ],
                    'data' => $media
                ];
                return $this->respond($response);
            }

            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Media retrieved successfully.'
                ],
                'data' => $media
            ];

            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error occurred while retrieving media: ' . $e->getMessage());
            return $this->failServerError('An error occurred while retrieving media.' . $e->getMessage());
        }
    }

    /**
     * Handle OPTIONS requests
     * 
     * @return mixed
     */
    public function options()
    {
        $this->response
            ->setHeader('Access-Control-Allow-Origin', '*')
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
            ->setHeader('Access-Control-Allow-Headers', 'X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method, Authorization');

        return $this->response->setStatusCode(200);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
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
        helper(['form', 'url']);

        try {
            $rules = [
                'media_name' => 'required|min_length[3]|max_length[255]|alpha_numeric',
                'media_file' => 'uploaded[media_file]|mime_in[media_file,image/jpg,image/jpeg,image/gif,image/png,video/mp4,video/mpeg]|max_size[media_file,20480]',
            ];

            if (!$this->validate($rules)) {
                $response = [
                    'status' => 400,
                    'error' => $this->validator->getErrors(),
                    'message' => [
                        'error' => 'Validation of media failed.'
                    ],
                    'data' => null
                ];
                return $this->respond($response);
            }

            $file = $this->request->getFile('media_file');

            if (!$file->isValid()) {
                $response = [
                    'status' => 400,
                    'error' => $file->getErrorString() . '(' . $file->getError() . ')',
                    'message' => [
                        'error' => 'Media file is not valid.'
                    ],
                    'data' => null
                ];
                return $this->respond($response);
            }

            $mediaName = $this->request->getPost('media_name');

            // Check if media name already exists and add timestamp to it if it does
            if ($this->mediaModel->where('media_name', $mediaName)->first()) {
                $mediaName = $mediaName . '_' . time();
            }

            $newFileName = $mediaName . '.' . $file->getExtension();

            $data = [
                'media_name' => $mediaName,
                'media_type' => $file->getClientMimeType(),
                'media_path' => '../assets/uploads/media/' . $newFileName
            ];

            try {
                $file->move('../assets/uploads/media', $newFileName);
            } catch (\Exception $e) {
                log_message('error', 'An error occurred while saving media to path: ' . $e->getMessage());
                return $this->failServerError('An error occurred while saving media to path.' . $e->getMessage());
            }

            $media_id = $this->mediaModel->insert($data);
            $data['media_id'] = $media_id;

            $response = [
                'status' => 201,
                'error' => null,
                'message' => [
                    'success' => 'Media uploaded successfully.'
                ],
                'data' => $data
            ];
            return $this->respondCreated($response);
        } catch (\Exception $e) {
            log_message('error', 'An error occurred while uploading media: ' . $e->getMessage());
            return $this->failServerError('An error occurred while uploading media.' . $e->getMessage());
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
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $existingMedia = $this->mediaModel->find($id);

        if (!$existingMedia) {
            $response = [
                'status' => 404,
                'error' => 404,
                'message' => [
                    'error' => 'Media with id ' . $id . ' not found.'
                ],
                'data' => null
            ];
            return $this->respond($response);
        }

        $mediaPath = $existingMedia['media_path'];

        print_r($mediaPath);
        print_r(gettype($mediaPath));

        if (file_exists($mediaPath)) {
            unlink($mediaPath);
        }

        try {
            $this->mediaModel->delete($id);

            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Media deleted successfully.'
                ],
                'data' => null
            ];
            return $this->respondDeleted($response);
        } catch (\Exception $e) {
            log_message('error', 'An error occurred while deleting media: ' . $e->getMessage());
            return $this->failServerError('An error occurred while deleting media.' . $e->getMessage());
        }
    }

    /**
     * Serve media file
     * 
     * @return mixed
     */
    public function showFile($file_name)
    {
        $file_path = '../assets/uploads/media/' . $file_name;
        $file_info = getimagesize($file_path);

        $mime = $file_info['mime'];

        header('Content-Type: ' . $mime);

        readfile($file_path);
    }

    /**
     * Get size of media file
     * 
     * @return mixed
     */
    public function fileSize($file_name)
    {
        $file_path = '../assets/uploads/media/' . $file_name;
        $file_size_bytes = filesize($file_path);
        $file_size = round($file_size_bytes / (1024 * 1024), 2);

        $response = [
            'status' => 200,
            'error' => null,
            'message' => [
                'success' => 'Media file size retrieved successfully.'
            ],
            'data' => $file_size
        ];

        return $this->respond($response);
    }
}
