<?php

namespace App\Models;

use CodeIgniter\Model;

class PenulisModel extends Model
{
    protected $table         = 'penulis';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama_penulis', 'biografi'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
}