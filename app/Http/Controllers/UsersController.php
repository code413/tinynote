<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function edit()
    {
        return view('users.edit');
    }

    public function update(User $user)
    {
        Validator::make(request()->all(), [
            'email' => Rule::requiredIf($user->email === null),
        ]);

        request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['email', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user->update([
            'name' => request('name'),
            'email' => !$user->email ? request('email') : $user->email,
            'password' => Hash::make(request('password')),
            'login_token' => null,
        ]);

        if (Cookie::has('login_token')) {
            Cookie::queue(Cookie::forget('login_token'));
        }

        return redirect()->route('uploads.index')->with('message', 'your profile was successfully updated.');

    }
}
