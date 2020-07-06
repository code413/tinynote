@extends('layouts.app')

@section('title') Error 401 @stop

@section('content')
    <div class="container flex text-center justify-center flex-col">
        <h1>401 | Unauthorized</h1>

        <p>{{ $exception->getMessage() }}</p>
    </div>
@stop
