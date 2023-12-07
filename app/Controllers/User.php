<?php

namespace App\Controllers;

use \App\Libraries\Oauth;
use \OAuth2\Request;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class User extends BaseController
{
    use ResponseTrait;

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

    public function show($id = null)
    {
        $model = new UserModel();
        $data = $model->find($id);
        return $this->respond($data);
    }

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

    // public function logout handle session on client side
    public function logout()
    {
        //     $oauth = new Oauth();
        //     $request = new Request();

        //     // print_r($request->createFromGlobals());


        //     // Check if access token exists
        //     if (!$oauth->server->verifyResourceRequest($request->createFromGlobals())) {
        //         return $this->failUnauthorized('Invalid access token');
        //     }

        //     // print_r($oauth->server->getAccessTokenData($request->createFromGlobals()));

        //     // Check if access token is present in the request
        //     print_r($this->request->getHeader('Authorization'));
        //     if (!$this->request->getHeader('Authorization')) {
        //         return $this->failUnauthorized('Missing access token');
        //     }

        //     // Revoke the access token

        //     $token = $oauth->server->getAccessTokenData($request->createFromGlobals());

        //     print_r($token);

        //     $response = $oauth->server->handleRevokeRequest($request->createFromGlobals());

        //     $code = $response->getStatusCode();
        //     $body = $response->getResponseBody();

        //     // check if the access token is revoked
        //     if ($code != 200) {
        //         return $this->fail('The access token could not be revoked');
        //     }

        //     // $data = [
        //     //     'status' => $code,
        //     //     'error' => null,
        //     //     'message' => [
        //     //         'success' => 'User logged out successfully'
        //     //     ],
        //     //     'data' => json_decode($body)
        //     // ];

        //     return $this->respond(json_decode($body), $code);
    }
}
