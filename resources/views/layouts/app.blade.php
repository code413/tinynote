@extends('layouts.master')

@section('main.class', 'flex flex-col  bg-orange-100 h-auto min-h-full relative ')

@section('main')
    @include('partials.header')

    <div class="flex items-center justify-center flex-1 py-16 -mt-10">
        @yield('content')

    </div>

    <div class="w-full absolute bottom-0" style="height:12rem; background: url(/img/wave.png) no-repeat"></div>
@stop