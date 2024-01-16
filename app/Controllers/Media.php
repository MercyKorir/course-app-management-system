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
                'media_name' => 'required|min_length[3]|max_length[255]',
                'media_type' => 'required|min_length[3]|max_length[255]',
                'media_path' => 'required|min_length[3]|max_length[255]'
            ];
        } catch (\Exception $e) {
            log_message('error', 'An error occurred while creating media: ' . $e->getMessage());
            return $this->failServerError('An error occurred while creating media.' . $e->getMessage());
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
        //
    }
}
