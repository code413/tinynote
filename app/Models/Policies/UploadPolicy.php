<?php

namespace App\Models\Policies;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UploadPolicy
{
    use HandlesAuthorization;

    public function manage(?User $user, Upload $upload)
    {
        if($user && $upload->owner->id == $user->id)
        {
            return true;
        }

        foreach ($upload->invitees as $invitee)
        {
            if($user && $invitee->user_id == $user->id)
            {
                return true;
            }
        }

        return false;
    }
}
