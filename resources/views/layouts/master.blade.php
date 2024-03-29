<!doctype html>
<html lang='en'>
<head>
    @section('head')
        <title>
            @yield('title')
            @if(!view()->hasSection('title.suffix'))
                @if(view()->hasSection('title')) - @endif Tiny Note
            @endif
        </title>
        @include('layouts.partials.meta')
        @include('layouts.partials.favicon')
        @include('layouts.partials.styles')
        @if(config('app.env') == 'production')
            @include('layouts.partials.trackers')
        @endif
    @show
</head>
<body class="@yield('superclass')">
@if(config('app.env') == 'production')
    @include('layouts.partials.trackers')
@endif
<header>
    @section('header')
    @show
</header>
<main class="@yield('main.class')" id="app">
    @section('main')

    @show
</main>
<footer>
    @section('footer')
    @show
</footer>
@include('layouts.partials.scripts')
@yield('body.append')
</body>
</html>
