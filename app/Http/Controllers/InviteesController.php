<?php

namespace App\Http\Controllers;

use App\Models\Invitee;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Http\Request;

class InviteesController extends Controller
{
    public function store(Invitee $invitee, Upload $upload)
    {
        $email = request('email');

        $user = User::where('email', $email)->first();

        $invitee->create([
            'email' => $email,
            'upload_id' => $upload->id,
            'user_id' => $user != null ? $user->id : $user,
        ]);

        return back()->with('message', 'Invitation has been sent.');
    }
}
