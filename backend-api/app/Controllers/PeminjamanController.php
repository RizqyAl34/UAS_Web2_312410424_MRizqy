<?php

namespace App\Controllers;

use App\Models\PeminjamanModel;
use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class PeminjamanController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $model = new PeminjamanModel();
        return $this->respond([
            'status' => 200,
            'data'   => $model->getPeminjamanLengkap(),
        ]);
    }

    public function show($id = null)
    {
        $model = new PeminjamanModel();
        $data  = $model->find($id);
        if (!$data) {
            return $this->failNotFound('Data peminjaman tidak ditemukan.');
        }
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $model = new PeminjamanModel();
        $input = $this->request->getJSON(true);

        if (!$model->save($input)) {
            return $this->fail($model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Data peminjaman berhasil ditambahkan.',
        ]);
    }

    public function update($id = null)
    {
        $model = new PeminjamanModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Data peminjaman tidak ditemukan.');
        }

        $input = $this->request->getJSON(true);
        $model->update($id, $input);

        return $this->respond([
            'status'  => 200,
            'message' => 'Data peminjaman berhasil diupdate.',
        ]);
    }

    public function delete($id = null)
    {
        $model = new PeminjamanModel();
        if (!$model->find($id)) {
            return $this->failNotFound('Data peminjaman tidak ditemukan.');
        }

        $model->delete($id);
        return $this->respond([
            'status'  => 200,
            'message' => 'Data peminjaman berhasil dihapus.',
        ]);
    }
}