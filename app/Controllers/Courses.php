<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Courses extends BaseController
{
    public function index()
    {
        return view('courses');
    }
}
