@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        <ul>
            @forelse($uploads as $upload)
                <li>{{ $upload->name }}</li>
            @empty
                <p>There is no uploaded visual. <a href="{{ route('home') }}">Upload now!</a></p>
            @endforelse
        </ul>
    </div>
@stop
