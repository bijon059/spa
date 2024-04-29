<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::match( ['get','post'],'/tes', [ \App\Http\Controllers\TestController::class,"index" ]);
