<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Courses extends BaseController
{
    /**
     * Display the course view
     * 
     * @return mixed
     */
    public function index()
    {
        return view('courses');
    }
}
