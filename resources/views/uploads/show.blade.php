@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        <p class="mb-2 text-center">Click on the image where you have any comments on that spot.</p>

        <div class="p-0 m-0" style="position: relative; width: max-content; max-width: 100%">
            <img id="imageCanvas" src='{{ url("$upload->url") }}'
                 data-target="{{ route('comments.store', [$upload]) }}"
                 class="w-full">

            @include('uploads.partials.on-image-comments')
        </div>

        <div class="mt-8">
            <div>
                <h2 class="border-b-2 mb-10">General comments</h2>

                @include('uploads.partials.off-image-comments')
            </div>

            @include('uploads.partials.off-image-comment-form')
        </div>
    </div>
@stop
