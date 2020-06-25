<?php

namespace App\Http\Controllers;

use App\Events\CommentCreated;
use App\Models\Upload;

class CommentsController extends Controller
{
    public function store(Upload $upload)
    {
        $comment = $upload->comments()->create([
            'body' => request('body'),
            'coordinate_x' => request('coordinateX'),
            'coordinate_y' => request('coordinateY'),
            'user_id' => auth()->user()->id
        ]);

        event(new CommentCreated($comment));

        return response($comment->id, 200)
            ->header('Content-Type', 'text/plain');
    }
}
