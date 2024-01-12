<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->resource('course');
$routes->options('course', 'Course::options');
$routes->options('course/(:segment)', 'Course::options');
$routes->post('/course/update/(:segment)', 'Course::update/$1');
$routes->get('/image/(:any)', 'Course::showImage/$1');
$routes->options('image/(:any)', 'Course::options');

$routes->get('/courses', 'Course::getCourses');


$routes->resource('user', ['controller' => 'User']);
$routes->options('user', 'User::options');
$routes->options('user/login', 'User::options');
$routes->options('user/register', 'User::options');
$routes->post('/user/login', 'User::login');
$routes->post('/user/register', 'User::register');
$routes->post('/user/logout', 'User::logout');
$routes->options('user/logout', 'User::options');
$routes->post('/user/verify', 'User::verify');
$routes->options('user/verify', 'User::options');
$routes->get('/client', 'User::client');
$routes->options('client', 'User::options');


$routes->get('/', 'Home::index');
$routes->get('/course-page', 'Courses::index');
