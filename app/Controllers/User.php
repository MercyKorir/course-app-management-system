<?php

namespace App\Controllers;

use \App\Libraries\Oauth;
use \OAuth2\Request;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class User extends BaseController
{
    use ResponseTrait;

    /**
     * Return all users
     * 
     * @return mixed
     */
    public function index()
    {
        try {
            $model = new UserModel();
            $users = $model->findAll();

            if (!$users) {
                $response = [
                    'status' => 404,
                    'error' => 404,
                    'message' => [
                        'No users found.',
                    ],
                    'data' => $users,
                ];
                return $this->respond($response);
            }

            // Remove password from response for each user
            foreach ($users as $key => $user) {
                unset($users[$key]['password']);
            }

            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Users retrieved successfully.',
                ],
                'data' => $users,
            ];

            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error occurred while retrieving users: ' . $e->getMessage());
            return $this->fail('An error occurred while retrieving users.' . $e->getMessage());
        }
    }

    /**
     * Login user
     * 
     * @return mixed
     */
    public function login()
    {
        $oauth = new Oauth();
        $request = new Request();
        $response = $oauth->server->handleTokenRequest($request->createFromGlobals());

        // $username = $this->request->getPost('username');
        // $password = $this->request->getPost('password');

        // $request->request('grant_type', 'password');
        // $request->request('username', $username);
        // $request->request('password', $password);

        // $oauth->server->handleTokenRequest($request, $response);

        $code = $response->getStatusCode();
        $body = $response->getResponseBody();

        return $this->respond(json_decode($body), $code);
    }

    /**
     * Get client-secret
     * 
     * @return mixed
     */
    public function client()
    {
        try {
            $client = getenv('REACT_APP_EXCLUDE_TEST_CLIENT');
            $secret = getenv('REACT_APP_EXCLUDE_TEST_SECRET');

            $data = [
                'client_id' => $client,
                'client_secret' => $secret,
            ];

            $response = [
                'status' => 200,
                'error' => null,
                'message' => [
                    'success' => 'Client secret retrieved',
                ],
                'data' => $data,
            ];

            return $this->respond($response);
        } catch (\Exception $e) {
            log_message('error', 'An error ocurred while retrieving client information' . $e->getMessage());
            return $this->fail('An error occurred while retrieving client information' . $e->getMessage());
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
     * Return user details
     * 
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new UserModel();
        $data = $model->find($id);
        unset($data['password']);
        return $this->respond($data);
    }

    /**
     * Register a new user
     * 
     * @return mixed
     */
    public function register()
    {
        helper(['form']);
        $data = [];

        // Show error if not post request
        if ($this->request->getMethod() != 'post') {
            return $this->fail('Only post request is allowed');
        }
        $rules = [
            'firstname' => 'required|min_length[3]|max_length[20]',
            'lastname' => 'required|min_length[3]|max_length[20]',
            'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[6]|max_length[200]',
            'password_confirm' => 'matches[password]',
        ];
        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        } else {
            $model = new UserModel();
            $data = [
                'firstname' => $this->request->getPost('firstname'),
                'lastname' => $this->request->getPost('lastname'),
                'email' => $this->request->getPost('email'),
                'password' => $this->request->getPost('password'),
            ];
            $user_id = $model->insert($data);
            $data['id'] = $user_id;
            unset($data['password']);
            return $this->respondCreated($data);
        }
    }

    public function logout()
    {
        helper(['form']);

        if ($this->request->getMethod() != 'post') {
            return $this->fail('Only post request is allowed');
        }

        $rules = [
            'token' => 'required',
            'token_type_hint' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        try {
            $oauth = new Oauth();
            $token = $this->request->getPost('token');
            $token_type_hint = $this->request->getPost('token_type_hint');

            if ($token_type_hint == 'access_token') {
                $revoked = $oauth->server->getStorage('access_token')->unsetAccessToken($token);
            } else if ($token_type_hint == 'refresh_token') {
                $revoked = $oauth->server->getStorage('refresh_token')->unsetRefreshToken($token);
            } else {
                return $this->fail('Invalid token type hint');
            }

            if ($revoked) {
                return $this->respondDeleted(['message' => 'Token revoked']);
            } else {
                return $this->fail('Token not found');
            }
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

    public function verify()
    {
        helper(['form']);

        if ($this->request->getMethod() != 'post') {
            return $this->fail('Only post request is allowed');
        }

        $rules = [
            'token' => 'required',
            'token_type_hint' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        try {
            $oauth = new Oauth();
            $model = new UserModel();
            $token = $this->request->getPost('token');
            $token_type_hint = $this->request->getPost('token_type_hint');

            if ($token_type_hint == 'access_token') {
                $valid = $oauth->server->getStorage('access_token')->getAccessToken($token);
                if ($valid) {
                    $user_id = $valid['user_id'];
                    $user = $model->find($user_id);
                    unset($user['password']);
                }
            } else if ($token_type_hint == 'refresh_token') {
                $valid = $oauth->server->getStorage('refresh_token')->getRefreshToken($token);
            } else {
                return $this->fail('Invalid token type hint');
            }

            if ($valid) {
                $response = [
                    'status'  => 200,
                    'error'   => null,
                    'message' => [
                        'success'  => 'User is Authorized. Token is valid.',
                    ],
                    'data' => $user,
                ];
                return $this->respond($response);
            } else {
                $response = [
                    'status'  => 401,
                    'error'   => 401,
                    'message' => [
                        'error'  => 'User is Unauthorized. Token not found.',
                    ],
                ];
                return $this->respond($response);
            }
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }
}
