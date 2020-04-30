@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto max-w-4xl p-10">
        <div>
            <form method="POST" action="{{ route('uploads.store') }}" enctype="multipart/form-data">
                @csrf

                <input type="file" name="image">

                <button class="btn btn-blue">Submit</button>
            </form>
        </div>
    </div>
@stop
