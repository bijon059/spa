<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
   public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $data = new \stdClass();
            $data->user = $request->user();
            //$data->session = $request->session();
            return response()->json($data);
        }

        return response()->json([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
