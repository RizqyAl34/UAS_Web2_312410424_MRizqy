<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateAllTables extends Migration
{
    public function up()
    {
        // Tabel users
        $this->forge->addField([
            'id'         => ['type' => 'INT', 'auto_increment' => true],
            'nama'       => ['type' => 'VARCHAR', 'constraint' => 100],
            'email'      => ['type' => 'VARCHAR', 'constraint' => 100],
            'password'   => ['type' => 'VARCHAR', 'constraint' => 255],
            'token'      => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'role'       => ['type' => 'ENUM', 'constraint' => ['admin'], 'default' => 'admin'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addUniqueKey('email');
        $this->forge->createTable('users');

        // Tabel kategori
        $this->forge->addField([
            'id'             => ['type' => 'INT', 'auto_increment' => true],
            'nama_kategori'  => ['type' => 'VARCHAR', 'constraint' => 100],
            'deskripsi'      => ['type' => 'TEXT', 'null' => true],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
            'updated_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('kategori');

        // Tabel penulis
        $this->forge->addField([
            'id'           => ['type' => 'INT', 'auto_increment' => true],
            'nama_penulis' => ['type' => 'VARCHAR', 'constraint' => 150],
            'biografi'     => ['type' => 'TEXT', 'null' => true],
            'created_at'   => ['type' => 'DATETIME', 'null' => true],
            'updated_at'   => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('penulis');

        // Tabel buku
        $this->forge->addField([
            'id'           => ['type' => 'INT', 'auto_increment' => true],
            'judul'        => ['type' => 'VARCHAR', 'constraint' => 200],
            'id_kategori'  => ['type' => 'INT'],
            'id_penulis'   => ['type' => 'INT'],
            'penerbit'     => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => true],
            'tahun_terbit' => ['type' => 'YEAR', 'null' => true],
            'stok'         => ['type' => 'INT', 'default' => 1],
            'sinopsis'     => ['type' => 'TEXT', 'null' => true],
            'cover_url'    => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'created_at'   => ['type' => 'DATETIME', 'null' => true],
            'updated_at'   => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('id_kategori', 'kategori', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->addForeignKey('id_penulis', 'penulis', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->createTable('buku');

        // Tabel peminjaman
        $this->forge->addField([
            'id'               => ['type' => 'INT', 'auto_increment' => true],
            'nama_peminjam'    => ['type' => 'VARCHAR', 'constraint' => 150],
            'id_buku'          => ['type' => 'INT'],
            'tanggal_pinjam'   => ['type' => 'DATE'],
            'tanggal_kembali'  => ['type' => 'DATE', 'null' => true],
            'status'           => ['type' => 'ENUM', 'constraint' => ['dipinjam','dikembalikan'], 'default' => 'dipinjam'],
            'created_at'       => ['type' => 'DATETIME', 'null' => true],
            'updated_at'       => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('id_buku', 'buku', 'id', 'RESTRICT', 'RESTRICT');
        $this->forge->createTable('peminjaman');
    }

    public function down()
    {
        $this->forge->dropTable('peminjaman', true);
        $this->forge->dropTable('buku', true);
        $this->forge->dropTable('penulis', true);
        $this->forge->dropTable('kategori', true);
        $this->forge->dropTable('users', true);
    }
}