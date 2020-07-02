<?php

namespace App\Mail;

use App\Models\Invitee;
use App\Models\Upload;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Password;

class InvitationSent extends Mailable
{
    use Queueable, SerializesModels;

    public $upload;
    public $invitee;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Upload $upload, Invitee $invitee)
    {
        $this->upload = $upload;
        $this->invitee = $invitee;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.invitation')
            ->with(['upload' => $this->upload, 'invitee' => $this->invitee]);
    }
}
