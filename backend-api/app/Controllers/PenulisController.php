<?php

namespace App\Controllers;

use App\Models\PenulisModel;
use CodeIgniter\RESTful\ResourceController;

class PenulisController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new PenulisModel();
        return $this->respond([
            'status' => 200,
            'data'   => $model->findAll(),
        ]);
    }

    public function show($id = null)
    {
        $model = new PenulisModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $model = new PenulisModel();
        $input = $this->request->getJSON(true);

        if (!$model->save($input)) {
            return $this->fail($model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Penulis berhasil ditambahkan.',
        ]);
    }

    public function update($id = null)
    {
        $model = new PenulisModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }

        $input = $this->request->getJSON(true);
        $model->update($id, $input);

        return $this->respond([
            'status'  => 200,
            'message' => 'Penulis berhasil diupdate.',
        ]);
    }

    public function delete($id = null)
    {
        $model = new PenulisModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }

        $model->delete($id);
        return $this->respond([
            'status'  => 200,
            'message' => 'Penulis berhasil dihapus.',
        ]);
    }
}      