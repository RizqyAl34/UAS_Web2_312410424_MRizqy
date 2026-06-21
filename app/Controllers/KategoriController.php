<?php

namespace App\Controllers;

use App\Models\KategoriModel;
use CodeIgniter\RESTful\ResourceController;

class KategoriController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new KategoriModel();
        return $this->respond([
            'status' => 200,
            'data'   => $model->findAll(),
        ]);
    }

    public function show($id = null)
    {
        $model = new KategoriModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $model = new KategoriModel();
        $input = $this->request->getJSON(true);

        if (!$model->save($input)) {
            return $this->fail($model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Kategori berhasil ditambahkan.',
        ]);
    }

    public function update($id = null)
    {
        $model = new KategoriModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $input = $this->request->getJSON(true);
        $model->update($id, $input);

        return $this->respond([
            'status'  => 200,
            'message' => 'Kategori berhasil diupdate.',
        ]);
    }

    public function delete($id = null)
    {
        $model = new KategoriModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Kategori tidak ditemukan.');
        }

        $model->delete($id);
        return $this->respond([
            'status'  => 200,
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}