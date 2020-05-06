<?php

namespace App\Http\Controllers;

use App\Mail\InvitationSent;
use App\Models\Invitee;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InviteesController extends Controller
{
    public function store(Invitee $invitee, Upload $upload)
    {
        $email = request('email');

        $invitedUser = User::firstOrCreate(
            ['email' => $email],
            ['name' => request('name'), 'password' => bcrypt(Str::random(10))]
        );

        $invitee = $invitee->create([
            'upload_id' => $upload->id,
            'user_id' => $invitedUser->id,
            'token' => Str::random(50),
        ]);

        Mail::to($email)->send(new InvitationSent($upload, $invitee));

        return back()->with('message', 'Invitation has been sent.');
    }
}
