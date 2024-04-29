<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::match( ['get','post'],'/data', [ \App\Http\Controllers\TestController::class,"index" ]);
Route::match( ['post'],'/login', [ \App\Http\Controllers\AuthController::class,"login" ]);
Route::prefix('v1')->group(function (){
    Route::match( ['get','post'], "api-test", [ \App\Http\Controllers\TestController::class,"index" ] );
});
