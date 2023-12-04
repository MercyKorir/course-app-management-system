<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'user_id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['username', 'password', 'email', 'role', 'created_at', 'updated_at'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'username' => 'required|alpha_numeric|min_length[3]|max_length[30]|is_unique[users.username]',
        'password' => 'required|min_length[8]|max_length[255]|regex_match[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/]',
        'email'    => 'required|valid_email|is_unique[users.email]',
        'role'     => 'required|alpha|min_length[3]|max_length[50]',
    ];
    protected $validationMessages   = [
        'username' => [
            'required'      => 'Username is required',
            'alpha_numeric' => 'Username can only contain alphanumeric characters',
            'min_length'    => 'Username must be at least 3 characters in length',
            'max_length'    => 'Username cannot exceed 30 characters in length',
            'is_unique'     => 'Username already exists',
        ],
        'password' => [
            'required'      => 'Password is required',
            'min_length'    => 'Password must be at least 8 characters in length',
            'max_length'    => 'Password cannot exceed 255 characters in length',
            'regex_match'   => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        ],
        'email'    => [
            'required'      => 'Email is required',
            'valid_email'   => 'Email must be a valid email address',
            'is_unique'     => 'Email already exists',
        ],
        'role'     => [
            'required'      => 'Role is required',
            'alpha' => 'Role can only contain alphanumeric characters and spaces',
            'min_length'    => 'Role must be at least 3 characters in length',
            'max_length'    => 'Role cannot exceed 50 characters in length',
        ],
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    protected function beforeInsert(array $data)
    {
        $data = $this->hashPassword($data);

        return $data;
    }

    protected function beforeUpdate(array $data)
    {
        $data = $this->hashPassword($data);

        return $data;
    }
    // hashPassword method definition
    protected function hashPassword(array $data)
    {
        if (!isset($data['data']['password'])) {
            return $data;
        }

        $data['data']['password_hash'] = password_hash($data['data']['password'], PASSWORD_DEFAULT);
        unset($data['data']['password']);

        return $data;
    }
}
