<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function edit()
    {
        session(['link' => url()->previous()]);

        return view('users.edit');
    }

    public function update(User $user)
    {
        request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password')),
            'login_token' => null,
        ]);

        if(Cookie::has('login_token')){
            Cookie::queue(Cookie::forget('login_token'));
        }

        return redirect()->intended(session('link'));
    }
}
