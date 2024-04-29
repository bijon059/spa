<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function index()
    {
        $data = new \stdClass();
        $data->test = "Hello from test";
        return response()->json($data);
    }
}
