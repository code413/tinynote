<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Auth::routes();

Route::resource('uploads', 'UploadsController')->names([
    'store' => 'uploads.store',
    'show' => 'uploads.show',
]);

Route::middleware(['auth'])->group(function (){
    Route::post('/uploads/{upload}/comments', 'CommentsController@store')->name('comments.store');

    Route::put('/comments/{comment}', 'CommentsController@update')->name('comments.update');

    Route::delete('/comments/{comment}', 'CommentsController@destroy')->name('comments.destroy');

    Route::get('/uploads', 'UploadsController@index')->name('uploads.index');

});

