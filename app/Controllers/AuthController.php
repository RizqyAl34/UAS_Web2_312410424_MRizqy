<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
    $rules = [
        'email'    => 'required|valid_email',
        'password' => 'required|min_length[6]',
    ];

    if (!$this->validate($rules)) {
        return $this->failValidationErrors($this->validator->getErrors());
    }

    // Baca input lebih aman — support JSON maupun form-data
    $email    = $this->request->getVar('email') 
                ?? $this->request->getJSON(true)['email'] 
                ?? null;
    $password = $this->request->getVar('password') 
                ?? $this->request->getJSON(true)['password'] 
                ?? null;

    $model = new UserModel();
    $user  = $model->where('email', $email)->first();

    if (!$user) {
        return $this->failNotFound('Email tidak ditemukan.');
    }

    if (!password_verify($password, $user['password'])) {
        return $this->fail('Password salah.', 401);
    }

    $token = bin2hex(random_bytes(32));
    $model->update($user['id'], ['token' => $token]);

    return $this->respond([
        'status'  => 200,
        'message' => 'Login berhasil.',
        'data'    => [
            'id'    => $user['id'],
            'nama'  => $user['nama'],
            'email' => $user['email'],
            'token' => $token,
        ]
    ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        if (!$token) {
            return $this->fail('Token tidak ditemukan.', 401);
        }

        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if (!$user) {
            return $this->failNotFound('Token tidak valid.');
        }

        $model->update($user['id'], ['token' => null]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Logout berhasil.',
        ]);
    }
}