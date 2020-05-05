<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Support\Facades\Storage;

class UploadsController extends Controller
{
    public function store(Upload $upload)
    {
        request()->validate([
            'image' => 'required|mimes:jpeg,jpg,png,gif|max:5000'
        ]);

        $file = request()->file('image');

        $extension = $file->extension();

        $name = $file->getClientOriginalName();

        $size['width'] = getimagesize($file)[0];
        $size['height'] = getimagesize($file)[1];

        $uploaded = $upload->create([
            'name'=>$name,
            'size'=>$size,
            'owner_id'=>auth()->check() ? auth()->user()->id : null,
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
        return view('uploads.show', ['upload'=>$upload]);
    }

    public function index()
    {
        $uploads = auth()->user()->uploads;

        return view('uploads.index', ['uploads' =>$uploads]);
    }

    public function update(Upload $upload)
    {
        $upload->update([
            'owner_id' => auth()->user()->id
        ]);

        return redirect()->back();
    }
}
