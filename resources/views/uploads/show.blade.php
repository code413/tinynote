@extends('layouts.master')

@section('title', "- $upload->name")

@section('superclass', 'bg-gray-100')

@section('main')
    <editor class="h-full" :data='@json($upload)' :auth_user='@json(auth()->user())'></editor>
@stop
