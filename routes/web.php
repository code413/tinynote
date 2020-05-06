<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Auth::routes();

Route::post('uploads', 'UploadsController@store')->name('uploads.store');

Route::get('uploads/{upload}', 'UploadsController@show')->name('uploads.show');

Route::middleware(['auth'])->group(function () {
    Route::put('/uploads/{upload}', 'UploadsController@update')->name('uploads.update');

    Route::post('/uploads/{upload}/comments', 'CommentsController@store')->name('comments.store');

    Route::put('/comments/{comment}', 'CommentsController@update')->name('comments.update');

    Route::delete('/comments/{comment}', 'CommentsController@destroy')->name('comments.destroy');

    Route::get('/uploads', 'UploadsController@index')->name('uploads.index');

    Route::post('/invitees/{upload}', 'InviteesController@store')->name('invitees.store');
});


Route::get('mailable', function () {
    $upload = \App\Models\Upload::findOrFail(1)->first();
    $invitee = \App\Models\Invitee::findOrFail(1)->first();

    return new App\Mail\InvitationSent($upload, $invitee);
});

