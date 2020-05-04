<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Upload;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function store(Upload $upload)
    {
        if(!auth()->check())
        {
            return redirect()->route('login');
        }

        if (request()->has('coordinateX') || request()->has('coordinateY')) {
            $comment = $upload->comments()->create([
                'coordinates' => json_encode([request()->get('coordinateX'), request()->get('coordinateY')]),
                'user_id' => auth()->user()->id
            ]);

            return response($comment->id, 200)
                ->header('Content-Type', 'text/plain');

        }else{
            $comment = $upload->comments()->create([
                'body' => request('body'),
                'coordinates' => json_encode([-1, -1]),
                'user_id' => auth()->user()->id
            ]);

            return redirect()->back();
        }
    }

    public function update(Comment $comment)
    {
        $comment->update([
            'body' => request('body')
        ]);

        return back();
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return back();
    }
}
