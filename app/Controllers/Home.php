<?php

namespace App\Controllers;

class Home extends BaseController
{
    /**
     * Display the welcome message
     * 
     * @return mixed
     */
    public function index(): string
    {
        return view('welcome_message');
    }
}
