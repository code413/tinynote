<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitee extends Model
{
    protected $guarded = [];

    public function getRouteKeyName()
    {
        return 'token';
    }

    public function upload()
    {
        return $this->belongsTo(Upload::class);
    }
}
