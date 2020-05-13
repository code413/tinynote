<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    public function upload()
    {
        return $this->belongsTo(Upload::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function author()
    {
        if(auth()->check() && $this->user_id == auth()->user()->id)
        {
            return true;
        }

        return false;
    }

    public function isOnTheImage()
    {
        if($this->coordinates_x != null || $this->coordinate_y != null)
        {
            return true;
        }


        return false;
    }
}
