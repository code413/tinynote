@extends('layouts.master')

@section('title') Error 401 @stop

@section('main')
    <div class="py-4 lg:py-8" style="background: #f3c6bd">
        <div class="container px-10">
            <div class="flex flex-col pt-8 items-center">
                <h1>401 | Unauthorized</h1>

                <img src="{{ url('img/pablo-error.png') }}" class="mx-auto my-4" style="max-width: 40rem">

                <p>{{ $exception->getMessage() }}</p>
            </div>
        </div>
    </div>
@stop
