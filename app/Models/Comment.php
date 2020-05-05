<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    protected $cast = [
        'coordinates' => 'array'
    ];

    protected $attributes = [
      'coordinates' => []
    ];

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
        if(json_decode($this->coordinates)[0] >= 0 && json_decode($this->coordinates)[1] >= 0)
        {
            return true;
        }

        return false;
    }
}
