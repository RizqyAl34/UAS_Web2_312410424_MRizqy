<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Auth
$routes->post('api/auth/login',  'AuthController::login');
$routes->post('api/auth/logout', 'AuthController::logout', ['filter' => 'auth']);

// Public - GET boleh tanpa token
$routes->get('api/kategori',        'KategoriController::index');
$routes->get('api/kategori/(:num)', 'KategoriController::show/$1');
$routes->get('api/penulis',         'PenulisController::index');
$routes->get('api/penulis/(:num)',  'PenulisController::show/$1');
$routes->get('api/buku',            'BukuController::index');
$routes->get('api/buku/(:num)',     'BukuController::show/$1');
$routes->get('api/peminjaman',      'PeminjamanController::index');

// Protected - POST, PUT, DELETE butuh token
$routes->post('api/kategori',           'KategoriController::create',         ['filter' => 'auth']);
$routes->put('api/kategori/(:num)',      'KategoriController::update/$1',      ['filter' => 'auth']);
$routes->delete('api/kategori/(:num)',   'KategoriController::delete/$1',      ['filter' => 'auth']);

$routes->post('api/penulis',            'PenulisController::create',          ['filter' => 'auth']);
$routes->put('api/penulis/(:num)',       'PenulisController::update/$1',       ['filter' => 'auth']);
$routes->delete('api/penulis/(:num)',    'PenulisController::delete/$1',       ['filter' => 'auth']);

$routes->post('api/buku',               'BukuController::create',             ['filter' => 'auth']);
$routes->put('api/buku/(:num)',          'BukuController::update/$1',          ['filter' => 'auth']);
$routes->delete('api/buku/(:num)',       'BukuController::delete/$1',          ['filter' => 'auth']);

$routes->post('api/peminjaman',          'PeminjamanController::create',       ['filter' => 'auth']);
$routes->put('api/peminjaman/(:num)',     'PeminjamanController::update/$1',    ['filter' => 'auth']);
$routes->delete('api/peminjaman/(:num)', 'PeminjamanController::delete/$1',    ['filter' => 'auth']);