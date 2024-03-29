<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::post('uploads', 'UploadsController@store')->name('uploads.store');

Route::get('uploads/{upload}', 'UploadsController@show')->name('uploads.show');

Route::put('/uploads/{upload}', 'UploadsController@update')->name('uploads.update');

Route::delete('/uploads/{upload}', 'UploadsController@destroy')->name('uploads.delete');

Route::post('/uploads/{upload}/comments', 'CommentsController@store')->name('comments.store');

Route::get('/uploads', 'UploadsController@index')->name('uploads.index');

Route::post('/invitees/{upload}', 'InviteesController@store')->name('invitees.store');

Route::delete('/invitees/{inviteeId}', 'InviteesController@destroy')->name('invitees.delete');

Route::get('/users/edit', 'UsersController@edit')->name('users.edit');

Route::put('/users/{user}', 'UsersController@update')->name('users.update');

Route::view('/terms', 'terms')->name('terms');

Route::view('/free-design-feedback-tool', 'free-design-feedback-tool')->name('free-design-feedback-tool');

Route::view('/online-design-collaboration-tool', 'online-design-collaboration-tool')->name('online-design-collaboration-tool');

Route::view('/5-best-design-feedback-and-annotation-tools-for-designers', '5-best-design-feedback-and-annotation-tools-for-designers')->name('5-best-design-feedback-and-annotation-tools-for-designers');

Auth::routes();

/*Route::get('mailable', function () {
    $upload = \App\Models\Upload::findOrFail(1)->first();
    $invitee = \App\Models\Invitee::findOrFail(1)->first();

    return new App\Mail\InvitationSent($upload, $invitee);
});*/
