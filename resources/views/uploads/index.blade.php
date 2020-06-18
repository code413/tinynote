@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        <h1 class="mb-10">Your List of Uploads</h1>

        <ul>
            @forelse($uploads as $upload)
                <li class="my-2">
                    <span>{{ $loop->iteration }}. </span>
                    <a href="{{ route('uploads.show', [$upload]) }}">{{ $upload->name }}</a>
                    <span class="text-xs bg-green-300 rounded p-1"> {{ count($upload->comments) }} comments</span>
                </li>
            @empty
                <p>You haven't uploaded any visuals. <a href="{{ route('home') }}">Do it now!</a></p>
            @endforelse
        </ul>
    </div>
@stop
