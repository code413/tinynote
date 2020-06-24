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
        request()->validate([
            'email' => 'required|string|email|max:255',
        ]);

        $email = request('email');

        $name = Str::beforeLast($email, '@');

        $invitedUser = User::firstOrCreate(
            ['email' => $email],
            ['name' => $name, 'password' => bcrypt(Str::random(10))]
        );

        $invitee = $invitee->firstOrCreate(
            ['upload_id' => $upload->id, 'user_id' => $invitedUser->id],
            ['token' => Str::random(50),]
        );

        Mail::to($email)->send(new InvitationSent($upload, $invitee));

        return ['message'=> ['Invitation has been emailed.']];
    }
}
