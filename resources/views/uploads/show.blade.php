@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <editor :data="{{$upload}}" class="h-full"></editor>
@stop
