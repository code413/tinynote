<?php

use App\Models\Upload;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('comments.{uploadId}', function ($user, $uploadId) {

    $upload = Upload::findOrFail($uploadId);

    if ($user->id == $upload->owner_id) {
        return true;
    }

    foreach ($upload->invitees as $invitee) {
        if ($user->id == $invitee->user_id) {
            return true;
        }
    }

    return false;
});
