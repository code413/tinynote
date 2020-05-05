<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Upload extends Model
{
    protected $guarded =[];

    protected $casts = [
        'size' => 'array'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->uuid = (string) Uuid::generate(4);
        });
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function invitees()
    {
        return $this->hasMany(Invitee::class);
    }

    public function owned()
    {
        if($this->owner_id != null)
        {
            return true;
        }

        return false;
    }
}
