<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->resource('course');

$routes->resource('user');
$routes->post('/user/login', 'User::login');
$routes->post('/user/register', 'User::register');

$routes->get('/', 'Home::index');
