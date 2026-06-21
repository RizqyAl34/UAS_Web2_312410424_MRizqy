<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table         = 'buku';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['judul', 'id_kategori', 'id_penulis', 'penerbit', 'tahun_terbit', 'stok', 'sinopsis', 'cover_url'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    // Join dengan kategori dan penulis
    public function getBukuLengkap()
    {
        return $this->db->table('buku b')
            ->select('b.*, k.nama_kategori, p.nama_penulis')
            ->join('kategori k', 'k.id = b.id_kategori')
            ->join('penulis p', 'p.id = b.id_penulis')
            ->get()
            ->getResultArray();
    }

    public function getBukuById($id)
    {
        return $this->db->table('buku b')
            ->select('b.*, k.nama_kategori, p.nama_penulis')
            ->join('kategori k', 'k.id = b.id_kategori')
            ->join('penulis p', 'p.id = b.id_penulis')
            ->where('b.id', $id)
            ->get()
            ->getRowArray();
    }
}