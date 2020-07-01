<?php

namespace App\Http\Controllers;

use App\Models\Invitee;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadsController extends Controller
{
    public function store(Upload $upload)
    {
        request()->validate([
            'image' => 'required|mimes:jpeg,jpg,png,gif|max:20000'
        ]);


        if (!auth()->check()) {
            if (request()->cookie('login_token')) {
                $user = User::where('login_token', request()->cookie('login_token'))->first();

            } else {
                $user = User::create([
                    'name' => 'Unknown',
                    'login_token' => Str::random(50),
                ]);

                Cookie::queue(Cookie::make('login_token', $user->login_token, 525600));
            }

            Auth::login($user, true);
        }

        $file = request()->file('image');

        $extension = $file->extension();

        $name = $file->getClientOriginalName();

        $size['width'] = getimagesize($file)[0];

        $size['height'] = getimagesize($file)[1];

        $uploaded = $upload->create([
            'name' => $name,
            'size' => $size,
            'owner_id' => auth()->check() ? auth()->user()->id : $user->id,
        ]);

        $path = $file->storeAs("public/uploads", $uploaded->uuid . '.' . $extension);

        $url = Storage::url($path);

        $uploaded->url = $url;

        $uploaded->save();

        return response($uploaded->uuid, 200)
            ->header('Content-Type', 'text/plain');
    }

    public function show(Upload $upload)
    {
        if (request()->has('token')) {
            $userId = Invitee::where('token', request('token'))->first()->user_id;

            $user = User::findorFail($userId);

            Auth::login($user, true);
        }

        if (!request()->has('token') && request()->cookie('login_token')) {
            $user = User::where('login_token', request()->cookie('login_token'))->first();

            Auth::login($user, true);
        }

        $this->authorize('manage', $upload);

        $upload->load(['comments.user', 'invitees.user', 'owner']);

        return view('uploads.show', ['upload' => $upload]);
    }

    public function index()
    {
        $uploads = auth()->user()->uploads;

        $invitedUploads = auth()->user()->invitedUploads->load('upload');

        return view('uploads.index', ['uploads' => $uploads, 'invitedUploads' => $invitedUploads]);
    }

    public function update(Upload $upload)
    {
        request()->validate([
            'name' => 'string|max:100',
        ]);

        $upload->update([
            'name' => request('name') ? request('name'): $upload->name
        ]);

        return redirect()->back();
    }

    public function destroy(Upload $upload)
    {
        $upload->delete();

        return redirect()->back()->with('message', 'The visual was successfully deleted.');
    }
}
