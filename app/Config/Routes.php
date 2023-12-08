<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->resource('course');
$routes->post('/course/update/(:segment)', 'Course::update/$1');


$routes->resource('user', ['controller' => 'User']);
$routes->options('user', 'User::options');
$routes->options('user/login', 'User::options');
$routes->post('/user/login', 'User::login');
$routes->post('/user/register', 'User::register');
// $routes->post('/user/logout', 'User::logout');
$routes->get('/', 'Home::index');
