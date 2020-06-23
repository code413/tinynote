
@component('mail::layout')

    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    <p>You are invited <strong>{{ $upload->owner->email ? 'by' . $upload->owner->name : '' }}</strong> to review an art work on <strong>{{ config('app.name') }}</strong>.
        <br>Please click the link below to contribute.
    </p>
    @component('mail::panel')
        <a href="{{ route('uploads.show', [$upload, 'token'=>$invitee->token]) }}" target="_blank">
            {{ route('uploads.show', [$upload, 'token'=>$invitee->token]) }}
        </a>
    @endcomponent


    @slot('footer')
        @component('mail::footer')
            {{ config('app.name') }} - All rights reserved.
        @endcomponent
    @endslot

@endcomponent
