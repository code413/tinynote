@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto max-w-4xl card">
        <div>
            <form method="POST" action="{{ route('uploads.store') }}" enctype="multipart/form-data" class="dropzone" id="upload-dropzone">
                @csrf

            </form>
        </div>
    </div>
@stop
