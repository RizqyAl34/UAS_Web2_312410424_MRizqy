<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table         = 'peminjaman';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama_peminjam', 'id_buku', 'tanggal_pinjam', 'tanggal_kembali', 'status'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getPeminjamanLengkap()
    {
        return $this->db->table('peminjaman pm')
            ->select('pm.*, b.judul as judul_buku')
            ->join('buku b', 'b.id = pm.id_buku')
            ->get()
            ->getResultArray();
    }
}