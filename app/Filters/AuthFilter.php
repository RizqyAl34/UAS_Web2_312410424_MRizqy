<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $token = $request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        if (!$token) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'  => 401,
                    'message' => 'Token tidak ditemukan. Akses ditolak.',
                ]);
        }

        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if (!$user) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'  => 401,
                    'message' => 'Token tidak valid atau sudah kedaluwarsa.',
                ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // tidak perlu diisi
    }
}