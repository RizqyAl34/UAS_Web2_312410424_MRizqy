<?php

namespace App\Controllers;

use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class BukuController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new BukuModel();
        return $this->respond([
            'status' => 200,
            'data'   => $model->getBukuLengkap(),
        ]);
    }

    public function show($id = null)
    {
        $model = new BukuModel();
        $data  = $model->getBukuById($id);
        if (!$data) {
            return $this->failNotFound('Buku tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $model = new BukuModel();
        $input = $this->request->getJSON(true);

        if (!$model->save($input)) {
            return $this->fail($model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Buku berhasil ditambahkan.',
        ]);
    }

    public function update($id = null)
    {
        $model = new BukuModel();
        if (!$model->getBukuById($id)) {
            return $this->failNotFound('Buku tidak ditemukan.');
        }

        $input = $this->request->getJSON(true);
        $model->update($id, $input);

        return $this->respond([
            'status'  => 200,
            'message' => 'Buku berhasil diupdate.',
        ]);
    }

    public function delete($id = null)
    {
        $model = new BukuModel();
        if (!$model->getBukuById($id)) {
            return $this->failNotFound('Buku tidak ditemukan.');
        }

        $model->delete($id);
        return $this->respond([
            'status'  => 200,
            'message' => 'Buku berhasil dihapus.',
        ]);
    }
}