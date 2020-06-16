<?php

namespace App\Http\Controllers;

use App\Events\CommentUpdated;
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
                'coordinate_x' => request('coordinateX'),
                'coordinate_y' => request('coordinateY'),
                'user_id' => auth()->user()->id
            ]);

            return response($comment->id, 200)
                ->header('Content-Type', 'text/plain');

        }else{
            $upload->comments()->create([
                'body' => request('body'),
                'coordinate_x' => null,
                'coordinate_y' => null,
                'user_id' => auth()->user()->id
            ]);

            return redirect()->back();
        }
    }

    public function update(Comment $comment)
    {
        if(!$comment->author())
        {
            return abort(403);
        }

        $comment->update([
            'body' => request('body')
        ]);

        event(new CommentUpdated($comment));

        return back();
    }

    public function destroy(Comment $comment)
    {
        if(!$comment->author())
        {
            return abort(403);
        }

        $comment->delete();

        return back();
    }
}
